import {nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";

export const isLoading = ref(true);
export const isReady = ref(false);

let initialized = false;

export function useAssetLoader() {
  const pending = new Set<Element>();
  let observer: MutationObserver | null = null;
  let hideTimer: number | null = null;
  let hidden = false;

  const clearHideTimer = () => {
    if (hideTimer !== null) {
      window.clearTimeout(hideTimer);
      hideTimer = null;
    }
  };

  const trackImage = (img: HTMLImageElement) => {
    if (img.dataset.assetTracked === "true") return;
    img.dataset.assetTracked = "true";

    // Already finished (cached or broken) - nothing to wait for.
    if (img.complete) return;

    pending.add(img);

    const finish = () => {
      pending.delete(img);
      tryHide();
    };

    img.addEventListener("load", finish, { once: true });
    img.addEventListener("error", finish, { once: true });
  };

  const trackEmbed = (el: HTMLEmbedElement) => {
    if (el.dataset.assetTracked === "true") return;
    el.dataset.assetTracked = "true";

    pending.add(el);

    const finish = () => {
      pending.delete(el);
      tryHide();
    };

    el.addEventListener("load", finish, { once: true });
    el.addEventListener("error", finish, { once: true });

    // Safety net in case an embed never fires a load/error event.
    window.setTimeout(finish, 6000);
  };

  const trackNode = (node: Node) => {
    if (!(node instanceof Element)) return;

    if (node instanceof HTMLImageElement) {
      trackImage(node);
    } else if (node instanceof HTMLEmbedElement) {
      trackEmbed(node);
    }

    node.querySelectorAll("img, embed").forEach((el) => {
      if (el instanceof HTMLImageElement) {
        trackImage(el);
      } else if (el instanceof HTMLEmbedElement) {
        trackEmbed(el);
      }
    });
  };

  const tryHide = () => {
    if (hidden) return;

    if (pending.size > 0) {
      clearHideTimer();
      if (!isLoading.value) isLoading.value = true;
      return;
    }

    clearHideTimer();
    hideTimer = window.setTimeout(() => {
      if (pending.size > 0) return;

      const fontsReady =
        document.fonts && typeof document.fonts.ready?.then === "function"
          ? document.fonts.ready
          : Promise.resolve();

      fontsReady.then(() => {
        if (pending.size === 0 && !hidden) {
          hidden = true;
          isLoading.value = false;
          observer?.disconnect();
          observer = null;
        }
      });
    }, 300);
  };

  onMounted(async () => {
    if (initialized) return;
    initialized = true;

    await nextTick();

    document.querySelectorAll("img").forEach((el) => trackImage(el as HTMLImageElement));
    document.querySelectorAll("embed").forEach((el) => trackEmbed(el as HTMLEmbedElement));

    observer = new MutationObserver((mutations) => {
      if (hidden) return;

      for (const mutation of mutations) {
        mutation.addedNodes.forEach(trackNode);
      }

      tryHide();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState !== "complete") {
      window.addEventListener("load", () => tryHide(), { once: true });
    }

    tryHide();

    // Safety net so the loader can never get stuck.
    window.setTimeout(() => {
      if (!hidden) {
        hidden = true;
        isLoading.value = false;
        observer?.disconnect();
        observer = null;
      }
      window.setTimeout(() => {
        isReady.value = true;
      }, 500);
    }, 8000);
  });

  onBeforeUnmount(() => {
    clearHideTimer();
    observer?.disconnect();
    observer = null;
  });

  return { isLoading };
}

export const waitForReady = async () => {
  if (isReady.value) return;
  await new Promise<void>((resolve) => {
    const unwatch = watch(isReady, (value) => {
      if (value) {
        unwatch();
        resolve();
      }
    });
    window.setTimeout(() => {
      unwatch();
      resolve();
    }, 8000);
    if (isReady.value) {
      unwatch();
      resolve();
    }
  });
};