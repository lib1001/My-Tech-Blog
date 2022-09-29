const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: {
				exclude: ['password']
			},
			include: [{
				model: Post
			}],
		});

		const user = userData.get({
			plain: true
		});

		res.render('dashboard', {
			...user,
			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;








// router.get('/blog/:id', async (req, res) => {
//   try {
//       const blogData = await Blog.findByPk(req.params.id, {
//           include: [
//               { model: User},
//               { model: Comment}
//           ],
//       });

//       const blog = blogData.get({ plain: true });

//       res.render('blog', {
//           blog,
//       });
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

// router.get('/blog', async (req, res) => {
//   try {
//       const blogData = await Blog.findByPk(req.params.id, {
//           include: [
//               {
//                   model: User,
//                   attributes: ['username'],
//               },
//           ],
//       });

//       const blog = blogData.get({ plain: true });

//       res.render('blog', {
//           ...blog,
//           logged_in: req.session.logged_in
//       });
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

// router.get('/newpost', async (req, res) => {
//   const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Blog }],
//   });

// const user = userData.get({ plain: true });

//   try {
//       res.render('newpost', {
//           ...user,
//           logged_in: true
//       });
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

// router.get('/editpost/:id', async (req, res) => {
//   const blogData = await Blog.findByPk(req.params.id, {
//       include: [{ model: User }],
//   });

// const blog = blogData.get({ plain: true });

//   try {
//       res.render('editpost', {
//           blog,
//       });
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

// router.get('/comment/:id', async (req, res) => {
//   const blogData = await Blog.findByPk(req.params.id, {
//       include: [
//           { model: User },
//       ],
//   });

//   const comment = blogData.get({ plain: true });

//   try{
//       res.render('comment', {
//          blog,
//       });
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

// router.get('/comment', async (req, res) => {
//   const commentData = await Comment.findByPk(req.params.id, {
//       include: [
//           { model: Blog }
//       ],
//   });

//   const comment = commentData.get({ plain: true });

//   try{
//       res.render('comment', {
//          comment,
//       });
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });
