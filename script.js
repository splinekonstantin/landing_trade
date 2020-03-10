console.log('it works!!!!');

const tabButtons = document.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
// select navButtons to add a class selected
const navButtons = Array.from(document.querySelectorAll('.nav-button'));

// select all header-options
const headerButtons = document.querySelectorAll('.header-option');
// select main section
const main = document.querySelector('main');

if (window.innerWidth < 750) {
        tabPanels.forEach(panel => {
                panel.hidden = true;
        });
}

function handleTabClick(event) {
        // hide all tab panels
        tabPanels.forEach(panel => {
                panel.hidden = true;
        });
        // mark all tabs as unselected
        tabButtons.forEach(tab => {
                tab.setAttribute('aria-selected', false);
        });
        // mark the clicked tab as selected
        event.currentTarget.setAttribute('aria-selected', true);
        // find the associated tabPanel and show it!
        // get an id from data attribute of a button that got clicked

        const { id } = event.currentTarget.dataset;
        // find a tabPanel that matches the id in the array of tabPanels

        const tabPanel = tabPanels.find(panel => panel.getAttribute('aria-labelledby') === id);
        // check if mobile or desktop version
        if (window.innerWidth > 750) {
                // desktop version
                // show the tabPanel that is selected
                tabPanel.hidden = false;

                // remove selected class from all navButtons
                navButtons.forEach(button => {
                        button.classList.remove('selected');
                });

                // check if it's nav-button to avoid adding class "selected" to header-options
                if (event.currentTarget.classList.contains('nav-button')) {
                        event.currentTarget.classList.add('selected');
                } else {
                        // select a button that matches the id of clicked navButtons
                        const navButton = navButtons.find(button => button.getAttribute('data-id') === id);
                        // add "selected" class on a clicked button
                        navButton.classList.add('selected');

                        // <<<<<<<<<<<<<<<<<<<<ANIMATION>>>>>>>>>>>>>>>>>>>
                        const header = document.querySelector('header');
                        header.classList.add('anim-header');
                        setTimeout(() => {
                                header.classList.remove('anim-header');
                        }, 800);
                        const headerContent = document.querySelector('.header-content-wrapper');
                        headerContent.classList.add('anim-header-content');
                        setTimeout(() => {
                                headerContent.classList.remove('anim-header-content');
                        }, 800);
                }
        }
        // mobile-version
        // check if the tabPanel is NOT open already
        else if (
                event.currentTarget.nextElementSibling === null ||
                !event.currentTarget.nextElementSibling.classList.contains('main-content')
        ) {
                const myEl = document.createElement('section');
                myEl.innerHTML = tabPanel.innerHTML;
                myEl.classList.add('main-content');
                myEl.classList.add('hide-desktop');

                event.currentTarget.insertAdjacentElement('afterend', myEl);
                main.classList.remove('background1');
                main.classList.add('background2');
                event.currentTarget.lastElementChild.classList.add('anim-arrow');
                event.currentTarget.lastElementChild.classList.remove('anim-arrow-reverse');

                // myEl.classList.add('anim-main-content-mobile');
        } else {
                // remove the tabPanel if it's open
                event.currentTarget.nextElementSibling.remove();
                event.currentTarget.lastElementChild.classList.remove('anim-arrow');
                event.currentTarget.lastElementChild.classList.add('anim-arrow-reverse');
                main.classList.remove('background2');
                main.classList.add('background1');
                // const x = Array.from(event.currentTarget.parentElement.children);
                // x.forEach(child => {
                //         console.log(child.classList.contains('main-content'));
                //         if (!child.classList.contains('main-content')) {
                //                 main.classList.remove('background2');
                //                 main.classList.add('background1');
                //         } else {
                //                 main.classList.remove('background1');
                //                 main.classList.add('background2');
                //         }
                // });
        }
}

// add EventListener to each of the tabButtons
tabButtons.forEach(button => button.addEventListener('click', handleTabClick));

// jump to main when the header-options got clicked

function handleHeaderClick() {
        setTimeout(() => {
                main.scrollIntoView();
                main.classList.add('anim-main');
                setTimeout(() => {
                        main.classList.remove('anim-main');
                }, 800);
                tabPanels.forEach(panel => {
                        panel.classList.add('anim-main-content');
                });
        }, 800);
}

// add EventListener to each of the header-options
headerButtons.forEach(button => button.addEventListener('click', handleHeaderClick));
// navButtons.forEach(button => button.addEventListener('click', handleHeaderClick));

// <<<<<<<<<<<<<<<<<ANIMATION>>>>>>>>>>>>>>>>>>>>
// create an IntersectionObserver that will fire animation
