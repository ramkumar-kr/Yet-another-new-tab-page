document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bookmarks').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://bookmarks' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('apps').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://apps' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('downloads').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://downloads' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('settings').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://settings' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('extensions').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://extensions' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('history').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://history' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('inspector').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://inspect' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('profiler').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://profiler' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('plugins').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://plugins' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('flags').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://flags' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('about').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://version' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('urls').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://chrome-urls' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('webstore').addEventListener('click', function() {
        chrome.tabs.update({ url: 'https://chrome.google.com/webstore' });
    });
});