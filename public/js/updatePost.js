const updateFormHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#post-title').value.trim();

	const post_content = document.querySelector('#post_content').value.trim();

	if (title && post_content) {
		const response = await fetch(`/api/posts${id}`, {
			method: 'PUT',
			body: JSON.stringify({ title, post_content }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to update post');
		}
	}
};

document
	.querySelector('.update-post-form')
	.addEventListener('submit', updateFormHandler);