const isClient = typeof window !== 'undefined';

export default class Tracker {
  dataLayer: any[];

  constructor() {
    this.dataLayer = (isClient ? (window as any).dataLayer || [] : []) as any[];
  }

  set(values = {}) {
    const context = {
      page_path: isClient ? window.location.pathname : null,
      locale: isClient ? window.document.querySelector('html')?.lang : null,
      pageId: isClient
        ? (
            window.document.querySelector(
              '[data-tracker-page-id]'
            ) as HTMLElement | null
          )?.dataset?.trackerPageId
        : null,
    };

    const valuesWithContext = {
      ...context,
      ...values,
    };

    return this.dataLayer.push(valuesWithContext);
  }

  pageview(url: string, options = {}) {
    return this.set({
      event: 'pageview',
      page_path: url,
      ...options,
    });
  }

  track(category: string, action = '', label = '', options = {}) {
    return this.set({
      event: 'eventTracking',
      category,
      action,
      label,
      ...options,
    });
  }
}
