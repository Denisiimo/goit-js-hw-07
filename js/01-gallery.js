import { galleryItems } from './gallery-items.js';
const IMG_NODE = "IMG";
const galleryRef = document.querySelector('.gallery');
const cardCreateEvt = cardCreate(galleryItems);
galleryRef.insertAdjacentHTML('beforeend', cardCreateEvt);
galleryRef.addEventListener('click', ModalOpen);

function ModalOpen(evt) {
    evt.preventDefault();
    const { nodeName, dataset } = evt.target;
    nodeName === IMG_NODE && showModal(dataset.source);
}

function showModal(src) {
    const modalClose = () => {};
    const modalLayout = `<img src="${src}">`;
    const modalOptions = {
        onShow: () => {
            document.addEventListener("keydown", modalClose);
        },
        onClose: () => {
            document.removeEventListener("keydown", modalClose);
        },
    };
    const modal = basicLightbox.create(modalLayout, modalOptions)
    modal.show();
}
function cardCreate(galleryItems){
    return galleryItems
    .map(({preview, original, description}) => {
        return `<div class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/></a></div>`
    }).join('');
}