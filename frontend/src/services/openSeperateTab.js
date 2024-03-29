const TAB_LINK = '/preview';

const openLinkInNewTab = async (linkPromise, loadingText, titleName) => {
    const secondTab = window.open(TAB_LINK, '_blank');
    secondTab.document.write(loadingText);
    secondTab.document.title = titleName;

    const generatedLink = await linkPromise;
    secondTab.location.href = generatedLink;
};

export { openLinkInNewTab };