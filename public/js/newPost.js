const newFormHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#post-title').value.trim();

	const post_content = document.querySelector('#post_content').value.trim();

	if (title && post_content) {
		const response = await fetch(`/api/posts`, {
			method: 'POST',
			body: JSON.stringify({ title, post_content }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to create post');
		}
	}
};

document
	.querySelector('.new-post-form')
	.addEventListener('submit', newFormHandler);