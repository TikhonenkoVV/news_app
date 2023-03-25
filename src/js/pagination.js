import {
    fetchPopularArticles,
    fetchSearchArticles,
    fetchCategoryArticles,
} from './fetch';

const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('.pagination__next-page');
const btnPrevPg = document.querySelector('.pagination__prev-page');

async function fetchData(newsPerPage) {
    const fetchedData = await fetchPopularArticles();
    const newsArray = fetchedData.results;

    const valuePage = {
        curPage: 1,
        numLinksTwoSide: 1,
        totalPages: Math.ceil(newsArray.length / newsPerPage),
    };

    pagination(valuePage);

    pg.addEventListener('click', e => {
        const ele = e.target;

        if (ele.dataset.page) {
            const pageNumber = parseInt(e.target.dataset.page, 10);

            valuePage.curPage = pageNumber;
            pagination(valuePage);
            // console.log(valuePage);
            handleButtonLeft(valuePage);
            handleButtonRight(valuePage);
        }
    });

    document
        .querySelector('.pagination__container')
        .addEventListener('click', function (e) {
            handleButton(e.target, valuePage);

            let pageNumber = valuePage.curPage;
            const start = (pageNumber - 1) * newsPerPage;
            const end = start + newsPerPage;
            const array = newsArray.slice(start, end);

            renderMarkup(array);
        });
}

function pagination(valuePage) {
    const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

    const range = delta + 4; // use for handle visible number of links left side
    
    let render = '';
    let renderTwoSide = '';
    let dot = `<li class="pagination___item pagination___item--dots"><a class="pagination___link">...</a></li>`;
    let countTruncate = 0; // use for ellipsis - truncate left side or right side

    // use for truncate two side
    const numberTruncateLeft = curPage - delta;
    const numberTruncateRight = curPage + delta;

    let active = '';
    for (let pos = 1; pos <= totalPages; pos++) {
        active = pos === curPage ? 'active' : '';
        // truncate
        if (totalPages >= 2 * range - 1) {
            if (
                numberTruncateLeft > 3 &&
                numberTruncateRight < totalPages - 3 + 1
            ) {
                // truncate 2 side
                if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
                    //mobile
                    renderTwoSide += renderPage(pos, active);
                }
            } else {
                // truncate left side or right side
                if (
                    (curPage < range && pos <= range) ||
                    (curPage > totalPages - range &&
                        pos >= totalPages - range + 1) ||
                    pos === totalPages ||
                    pos === 1
                ) {
                    render += renderPage(pos, active);
                } else {
                    countTruncate++;
                    if (countTruncate === 1) render += dot;
                }
            }
        } else {
            // not truncate
            render += renderPage(pos, active);
        }
    }

    if (renderTwoSide) {
        renderTwoSide =
            renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
        pg.innerHTML = renderTwoSide;
    } else {
        pg.innerHTML = render;
    }
}

function handleButtonLeft(valuePage) {
    if (valuePage.curPage === 1) {
        btnPrevPg.disabled = true;
    } else {
        btnPrevPg.disabled = false;
    }
}

function handleButtonRight(valuePage) {
    if (valuePage.curPage === valuePage.totalPages) {
        btnNextPg.disabled = true;
    } else {
        btnNextPg.disabled = false;
    }
}

function handleButton(element, valuePage) {
    if (element.classList.contains('pagination__prev-page')) {
        valuePage.curPage--;
        handleButtonLeft(valuePage);
        btnNextPg.disabled = false;
    } else if (element.classList.contains('pagination__next-page')) {
        valuePage.curPage++;
        handleButtonRight(valuePage);
        btnPrevPg.disabled = false;
    }
    pagination(valuePage);
}

function renderPage(index, active = '') {
    return ` <li class="pagination___item ${active}" data-page="${index}">
    <a class="pagination___link" href="#">${index}</a>
</li>`;
}

// HERE PLEASE ADD MARKUP RENDERING
function renderMarkup(newsArray) {
    console.log(newsArray);
}

// HERE IN BRACKETS PLEASE PROVIDE A NUMBER OF NEWS PER PAGE
fetchData(2);
