function splitList(raw: string | null | undefined): string[] {
  return (raw ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export function initProjectModal(tagLabels: Record<string, string>): void {
  const backdrop = document.getElementById('project-modal-backdrop');
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('project-modal-close');
  const imgWrapper = document.getElementById('project-modal-image-wrapper');
  const img = document.getElementById('project-modal-image') as HTMLImageElement | null;
  const titleEl = document.getElementById('project-modal-title');
  const authorEl = document.getElementById('project-modal-author');
  const startingDateEl = document.getElementById('project-modal-starting-date');
  const tagsEl = document.getElementById('project-modal-tags');
  const toolsEl = document.getElementById('project-modal-tools');
  const descEl = document.getElementById('project-modal-description');
  const linkEl = document.getElementById('project-modal-link') as HTMLAnchorElement | null;
  const shareBtn = document.getElementById('project-modal-share');
  const shareLabel = document.getElementById('project-modal-share-label');

  let activeProjectId: string | null = null;
  let triggerElement: HTMLElement | null = null;

  const closeModal = (clearHash = true) => {
    if (modal) modal.hidden = true;
    if (backdrop) backdrop.hidden = true;
    if (triggerElement) {
      triggerElement.focus();
      triggerElement = null;
    }
    activeProjectId = null;
    if (clearHash && window.location.hash) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
  };

  const trapFocus = (event: KeyboardEvent) => {
    if (!modal || modal.hidden) return;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const openModalFromCard = (card: Element) => {
    if (!modal || !backdrop) return;
    const projectId = card.getAttribute('data-project-id') || '';
    activeProjectId = projectId;

    const title = card.getAttribute('data-project-title') || '';
    if (titleEl) titleEl.textContent = title;
    if (authorEl) {
      const label = authorEl.getAttribute('data-label') || 'Author';
      authorEl.textContent = `${label}: ${card.getAttribute('data-project-author') || '-'}`;
    }
    if (startingDateEl) {
      const label = startingDateEl.getAttribute('data-label') || 'Starting date';
      startingDateEl.textContent = `${label}: ${card.getAttribute('data-project-starting-date') || '-'}`;
    }
    if (descEl) {
      descEl.textContent = card.getAttribute('data-project-description') || '';
    }
    if (linkEl) {
      linkEl.href = card.getAttribute('data-project-url') || '#';
    }

    if (tagsEl) {
      tagsEl.replaceChildren();
      for (const tag of splitList(card.getAttribute('data-project-tags'))) {
        const span = document.createElement('span');
        span.className = 'tag-chip';
        span.textContent = tagLabels[tag] ?? tag;
        tagsEl.appendChild(span);
      }
    }
    if (toolsEl) {
      toolsEl.replaceChildren();
      for (const tool of splitList(card.getAttribute('data-project-tools'))) {
        const span = document.createElement('span');
        span.className =
          tool.toLowerCase() === 'cursor' ? 'tool-chip tool-chip--cursor' : 'tool-chip';
        span.textContent = tool;
        toolsEl.appendChild(span);
      }
    }

    const image = card.getAttribute('data-project-image');
    if (image && img && imgWrapper) {
      img.src = image;
      img.alt = title;
      imgWrapper.hidden = false;
    } else if (imgWrapper) {
      imgWrapper.hidden = true;
    }

    backdrop.hidden = false;
    modal.hidden = false;
    closeBtn?.focus();

    if (projectId && window.location.hash !== `#${projectId}`) {
      history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}#${projectId}`
      );
    }

    if (shareLabel && shareBtn) {
      shareLabel.textContent = shareBtn.getAttribute('data-default-label') || '';
    }
  };

  const openModalFromHash = () => {
    const hash = window.location.hash.replace('#', '').trim();
    if (!hash) {
      closeModal(false);
      return;
    }
    const card = document.querySelector(`[data-project-id="${CSS.escape(hash)}"]`);
    if (card) {
      openModalFromCard(card);
    } else if (activeProjectId) {
      closeModal(false);
    }
  };

  document.addEventListener('click', (event) => {
    const card =
      event.target instanceof Element ? event.target.closest('[data-project-id]') : null;
    if (!card) return;
    event.preventDefault();
    triggerElement = card as HTMLElement;
    openModalFromCard(card);
  });

  closeBtn?.addEventListener('click', () => closeModal());
  backdrop?.addEventListener('click', () => closeModal());

  shareBtn?.addEventListener('click', async () => {
    const urlToShare = activeProjectId
      ? `${window.location.origin}${window.location.pathname}${window.location.search}#${activeProjectId}`
      : window.location.href;
    try {
      await navigator.clipboard.writeText(urlToShare);
      if (shareLabel) {
        shareLabel.textContent = shareBtn.getAttribute('data-copied-label') || '';
      }
    } catch {
      if (shareLabel && shareBtn) {
        shareLabel.textContent = shareBtn.getAttribute('data-default-label') || '';
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
    if (event.key === 'Tab') trapFocus(event);
  });
  window.addEventListener('hashchange', openModalFromHash);
  openModalFromHash();
}
