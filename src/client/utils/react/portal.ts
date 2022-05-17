type AddModalContainerReturnType = {
	modalContainer: HTMLDivElement | null;
	backDrop: HTMLDivElement | null;
};
export const addModalContainer = (
	modalContainerPresent = false,
	backDropPresent = false
): AddModalContainerReturnType => {
	const elements: AddModalContainerReturnType = { modalContainer: null, backDrop: null };
	if (!modalContainerPresent) {
		const modalContainer = document.createElement('div');
		modalContainer.setAttribute('id', 'modal-container');
		document.body.append(modalContainer);
		elements.modalContainer = modalContainer;
	}
	if (!backDropPresent) {
		const backDrop = document.createElement('div');
		backDrop.setAttribute('id', 'back-drop');
		document.body.append(backDrop);
		elements.backDrop = backDrop;
	}
	return elements;
};
