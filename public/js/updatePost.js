const updateFormHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#update-post-title').value.trim();

	const post_content = document.querySelector('#update-post_content').value.trim();

	if (title && post_content) {
		const response = await fetch(`/api/posts${id}`, {
			method: 'PUT',
			body: JSON.stringify({ title, post_content }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to update post');
		}
	}
};

document
	.querySelector('.update-post-form')
	.addEventListener('submit', updateFormHandler);