export const GA_TRACKING_ID = 'G-5LFRR61BGK';

export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};
