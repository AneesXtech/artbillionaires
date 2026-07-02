/**
 * Art Billionaires - Custom Pages Interaction Scripts
 * Handles Blog dynamic posts, comment submissions, testimonials submissions,
 * gallery category filtering, and the zoomable artwork lightbox.
 */

// ==========================================================================
// 1. Blog Post Database
// ==========================================================================
const BLOG_POSTS = {
  'collecting-guide': {
    title: 'The Art of Collecting Original Oil Paintings: A Beginner\'s Guide',
    date: 'July 1, 2026',
    author: 'Anand PKC',
    readTime: '6 min read',
    tag: 'Collecting',
    image: 'assets/Art Images/mystic-horizon.jpg',
    excerpt: 'Discover how to choose, evaluate, and care for handmade oil paintings. Build an inspiring collection that reflects your identity and elevates your space.',
    content: [
      '<p>Acquiring your first original oil painting is more than a simple transaction; it is an emotional and aesthetic milestone. Unlike printed reproductions, a hand-painted oil on canvas possesses texture, depth, and a physical presence that shifts with the light. It carries the marks of the artist\'s brush, palette knife, and creative journey.</p>',
      '<h2>1. Clarify Your Connection to the Piece</h2>',
      '<p>The most important rule of art collecting is to buy what you love. Trends come and go, but a painting that resonates with you on an emotional level will bring joy for decades. Ask yourself: What story does this painting tell? How do the colors influence my mood? Does the texture draw me in?</p>',
      '<blockquote>"Art is not what you see, but what you make others see. When you buy an original painting, you are acquiring a piece of the artist\'s soul and a lifetime of dedication."</blockquote>',
      '<h2>2. Understanding Mediums and Materials</h2>',
      '<p>As a collector, knowing what you are purchasing is critical. Heavy-bodied oils on premium linen or wood panels, like those created by Anand PKC, offer exceptional durability and luminous finishes. Oils take months to fully cure, resulting in a rich, saturated layer that acrylics simply cannot replicate. Wood panel surfaces provide structural longevity, allowing for heavy impasto strokes without canvas sagging.</p>',
      '<h2>3. Placement and Lighting</h2>',
      '<p>To preserve the beauty of your masterpiece, place it away from direct, harsh sunlight, which can fade pigments over centuries. Standard indoor LED lighting or warm gallery spotlighting brings out the deep tonal ranges of the painting. In a room, allow the painting breathing room—make it the focal point by keeping surrounding decor complementary rather than competitive.</p>',
      '<p>By starting your collection with authentic, hand-painted masterpieces, you invest in cultural legacy, support fine craftsmanship, and transform your home into a private museum of inspiration.</p>'
    ]
  },
  'impasto-mastery': {
    title: 'The Mastery of Impasto: Understanding Anand PKC\'s Palette Knife Techniques',
    date: 'June 25, 2026',
    author: 'Anand PKC',
    readTime: '5 min read',
    tag: 'Technique',
    image: 'assets/Art Images/mystical-girl-slide.jpg',
    excerpt: 'Unpack the depth and sensory presence of impasto oils. Explore how thick textures capture light and bring three-dimensional depth to framed canvas.',
    content: [
      '<p>Walk into a gallery displaying the works of Anand PKC, and your eyes will immediately be drawn to the physical relief of the paint. This is the magic of <strong>impasto</strong>—a technique where paint is applied thickly to a canvas or wood panel, making its texture stand out as a physical three-dimensional element.</p>',
      '<h2>What is Impasto?</h2>',
      '<p>Originating from the Italian word for "mixture" or "dough," impasto involves applying undiluted oil paint using stiff brushes or palette knives. When dry, these thick layers retain the exact shape and contours left by the tool. Rather than creating a flat window, the painting becomes a physical sculpture that interacts dynamically with the room\'s lighting.</p>',
      '<blockquote>"The thick ridges of paint catch light from different angles, casting tiny shadows and reflecting highlights that change throughout the day. It makes the painting feel alive."</blockquote>',
      '<h2>The Power of the Palette Knife</h2>',
      '<p>Anand PKC utilizes custom-shaped steel palette knives to sculpt heavy-bodied oils. By layering contrasting colors directly onto the wood or linen panel without prior blending, the knives create vibrant, unmuddied strokes. This technique is visible in the animal coats, bird plumage, and clothing textures within the gallery. It demands absolute confidence—each stroke is permanent, capturing the energy of the moment.</p>',
      '<h2>Why Collectors Prize Impasto</h2>',
      '<p>Impasto paintings have a sensory presence that digital screens fail to convey. When you look at an original piece, you can see the direction of the hand, the speed of the knife, and the sheer volume of paint loaded onto the panel. This physical evidence of human creation is what makes original paintings irreplaceable in an increasingly digital world.</p>'
    ]
  },
  'designing-space': {
    title: 'Designing Your Space Around a Statement Painting',
    date: 'June 18, 2026',
    author: 'Anand PKC',
    readTime: '4 min read',
    tag: 'Design',
    image: 'assets/Art Images/serenity-in-bloom.jpg',
    excerpt: 'How a single masterpiece can dictate the color, furniture, and emotional scale of a luxury interior. Learn design tips from top interior decorators.',
    content: [
      '<p>In luxury interior design, art is never an afterthought. A common mistake is selecting furniture and wall colors first, only to struggle to find a painting that "matches." Instead, start with a statement artwork. A large, textured original painting can command a room, setting the scale, tone, and color palette for the entire space.</p>',
      '<h2>1. Establishing the Focal Point</h2>',
      '<p>Every great room needs an anchor. Hanging a striking piece, such as a large wildlife oil painting or a vibrant figurative scene above a fireplace or console table, immediately draws the eye. The dimensions of the painting should correspond to the scale of the furniture; a good rule of thumb is that the artwork should span approximately two-thirds of the width of the furniture below it.</p>',
      '<h2>2. Pulling the Accent Palette</h2>',
      '<p>Look closely at the painting you love. Identify three core colors: a dominant shade, a secondary tone, and a minor accent color. Use these colors to guide your decor. For instance, if a forest landscape features gold leaf under-layers and deep emerald tones, select neutral luxury sofas but accent them with emerald velvet pillows and brass light fixtures. This ties the artwork organically into the architecture.</p>',
      '<h2>3. Balancing Textures</h2>',
      '<p>If your statement painting features heavy impasto textures and bold palette knife strokes, balance the room with sleek, clean surfaces like polished stone, dark wood, or minimalist leather. This contrast prevents visual clutter and allows the tactile qualities of the oil painting to truly shine.</p>'
    ]
  },
  'studio-wood-heritage': {
    title: 'Inside the Artist\'s Studio: The Heritage of Oil on Wood',
    date: 'June 10, 2026',
    author: 'Anand PKC',
    readTime: '5 min read',
    tag: 'Studio',
    image: 'assets/Art Images/Taj Mahal - Oil on Wood  48 x 36 inches  2011.jpg',
    excerpt: 'Step behind the easel to explore the timeless technique of painting on wood panels, a historical standard that dates back to the Italian Renaissance.',
    content: [
      '<p>Before the widespread adoption of stretched canvas in the late 16th century, the greatest masterpieces of the Western world—including Leonardo da Vinci\'s Mona Lisa—were painted on solid wood panels. Today, Anand PKC continues this ancient tradition, selecting wood panel backings for some of his most detailed and heavily textured paintings.</p>',
      '<h2>Why Paint on Wood?</h2>',
      '<p>Wood panels provide a rigid, unyielding surface that canvas cannot match. When an artist applies heavy layers of impasto oil paint with a palette knife, a flexible canvas will sag or flex over time, which can eventually lead to hairline cracks in the paint layers. Wood remains flat and structurally inert, supporting thick, heavy ridges of oil indefinitely.</p>',
      '<h2>The Preparation Process</h2>',
      '<p>Painting on wood requires expert preparation. The panel must be carefully seasoned, sanded, and sealed on both sides to prevent warping from humidity. Multiple coats of high-grade gesso are applied, creating a smooth yet slightly absorbent surface that binds perfectly with oil pigments. This meticulous prep work ensures that the painting remains pristine for centuries.</p>',
      '<h2>A Dialogue with Material</h2>',
      '<p>Painting on wood is a dialogue with the material. The organic grain and solid support invite a level of physical force and detail that canvas simply cannot withstand. Preparing panels is a labor of love that honors standard techniques and creates an archivable heirloom.</p>'
    ]
  },
  'lighting-museum-art': {
    title: 'Museum-Grade Lighting for Fine Art at Home',
    date: 'June 02, 2026',
    author: 'Anand PKC',
    readTime: '4 min read',
    tag: 'Design',
    image: 'assets/Art Images/An Evening Alone - Oil on Wood   48 x 32 inches  2007.jpg',
    excerpt: 'Learn how to illuminate your textured oil paintings to highlight their physical relief and brushstrokes without causing heat damage.',
    content: [
      '<p>Hanging a masterpiece in your home is only the first step. To fully experience the depth of hand-painted oils, you must illuminate them correctly. Proper lighting highlights palette knife strokes, reveals subtle glazes, and sets a museum-like mood in your living space.</p>',
      '<h2>1. The Angle of Light</h2>',
      '<p>To minimize glare on glossy varnishes, light should strike the painting at a 30-degree angle. If the light is too steep, it casts long, distracting shadows underneath heavy impasto ridges. If it is too flat, it reflects directly back into the viewer\'s eyes. Adjust your ceiling spotlights to achieve this perfect balance.</p>',
      '<h2>2. Choosing the Right Bulb</h2>',
      '<p>Never use halogen or incandescent bulbs directly in front of fine art, as the heat and UV rays will dry and crack oil paints over time. Opt for high-CRI (Color Rendering Index) LED fixtures. A CRI of 95 or higher ensures colors are represented accurately, bringing out the vibrant pigments exactly as the artist intended.</p>'
    ]
  },
  'framing-masterpieces': {
    title: 'The Art of Framing: Selecting Borders for Canvas',
    date: 'May 20, 2026',
    author: 'Anand PKC',
    readTime: '5 min read',
    tag: 'Collecting',
    image: 'assets/Art Images/A New Day Rising - Oil on Canvas - 48 x 36 inches  2011.jpg',
    excerpt: 'Explore how premium custom-framed wood borders protect original oil paintings, drawing viewers into their textured depths.',
    content: [
      '<p>A frame is not merely a border; it is the bridge between the artwork and the architecture. Selecting the right frame completes the masterpiece, protecting the canvas edge while focusing the viewer\'s eye into the depth of the scene.</p>',
      '<h2>1. Harmonizing with the Medium</h2>',
      '<p>Original oil paintings thrive when paired with substantial wood frames. Heavy impasto strokes and thick palette knife work demand borders with visual weight. A classic double-border profile with gold-leaf accents provides a regal boundary that complements the rich textures of original paintings.</p>',
      '<h2>2. Canvas vs. Panel Framing</h2>',
      '<p>While canvases require frames that wrap around their deep stretchers, wood panel paintings can be set into float frames or traditional deep-rabbet profiles. Floating frames create an elegant gap between the artwork and the wood border, giving the impression that the masterpiece is suspended in space.</p>'
    ]
  }
};

// ==========================================================================
// 2. Dynamic Blog Detail Page Router (single-post.html)
// ==========================================================================
function initSinglePost() {
  const container = document.getElementById('post-detail-content-area');
  if (!container) return;

  // Get post ID from URL parameters
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id') || 'collecting-guide'; // default fallback
  const post = BLOG_POSTS[postId];

  if (!post) {
    container.innerHTML = `<div class="post-content" style="text-align:center; padding: 100px 0;">
      <h2 style="font-family: var(--font-royal); color: var(--gold-main);">Article Not Found</h2>
      <p style="margin-top: 15px;"><a href="blog.html" class="btn btn-primary">Back to Blog</a></p>
    </div>`;
    return;
  }

  // Populate metadata, title, and featured image
  document.getElementById('post-title-el').textContent = post.title;
  document.getElementById('post-date-el').textContent = post.date;
  document.getElementById('post-author-el').textContent = post.author;
  document.getElementById('post-readtime-el').textContent = post.readTime;
  document.getElementById('post-tag-el').textContent = post.tag;
  
  const imgEl = document.getElementById('post-img-el');
  if (imgEl) {
    imgEl.src = post.image;
    imgEl.alt = post.title;
  }

  // Also update dynamic hero section text if elements exist
  const heroTitle = document.getElementById('post-hero-title-el');
  const heroDesc = document.getElementById('post-hero-desc-el');
  const breadcrumbTitle = document.getElementById('post-breadcrumb-title-el');
  
  if (heroTitle) heroTitle.textContent = post.title;
  if (heroDesc) heroDesc.textContent = post.excerpt;
  if (breadcrumbTitle) breadcrumbTitle.textContent = post.title;

  // Populate body content paragraphs
  const bodyEl = document.getElementById('post-body-paragraphs');
  if (bodyEl) {
    bodyEl.innerHTML = post.content.join('\n');
  }

  // Load and render comments for this post
  renderPostComments(postId);

  // Bind comment form submit
  const commentForm = document.getElementById('post-comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitComment(postId);
    });
  }
}

// Comments local storage manager
function renderPostComments(postId) {
  const commentListContainer = document.getElementById('comment-list-container');
  const countEl = document.getElementById('comment-count-el');
  if (!commentListContainer) return;

  const storageKey = `artBillionairesComments_${postId}`;
  let comments = [];
  try {
    const stored = localStorage.getItem(storageKey);
    comments = stored ? JSON.parse(stored) : [];
  } catch (err) {
    comments = [];
  }

  // Prepopulated mock comments if empty
  if (comments.length === 0) {
    comments = [
      { name: 'Arthur Pendelton', date: 'Yesterday', text: 'This article was incredibly enlightening. As someone who has only collected canvas works, understanding the benefits of wood panels has changed my perspective completely.' },
      { name: 'Elena Rostova', date: '3 days ago', text: 'The depth of texture in Anand PKC\'s work is indeed museum-quality. I appreciate the guidance on placement and lighting—it really makes a huge difference in how the colors reflect.' }
    ];
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }

  countEl.textContent = `${comments.length} Comments`;
  
  commentListContainer.innerHTML = comments.map(c => `
    <div class="comment-card">
      <div class="comment-header">
        <div class="commenter-info">
          <div class="commenter-avatar">${c.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}</div>
          <span class="commenter-name">${c.name}</span>
        </div>
        <span class="comment-date">${c.date}</span>
      </div>
      <p class="comment-text">${c.text}</p>
    </div>
  `).join('\n');
}

function submitComment(postId) {
  const nameInput = document.getElementById('comment-author-name');
  const textInput = document.getElementById('comment-message-text');
  if (!nameInput || !textInput) return;

  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (!name || !text) {
    alert('Please fill out both Name and Message fields.');
    return;
  }

  const storageKey = `artBillionairesComments_${postId}`;
  let comments = [];
  try {
    comments = JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch (err) {
    comments = [];
  }

  const newComment = {
    name,
    text,
    date: 'Just now'
  };

  comments.push(newComment);
  localStorage.setItem(storageKey, JSON.stringify(comments));

  // Reset form inputs
  nameInput.value = '';
  textInput.value = '';

  // Re-render comments list
  renderPostComments(postId);

  // Trigger global toast if method is available
  if (window.showToast) {
    window.showToast('Comment submitted successfully!');
  } else {
    alert('Thank you! Your comment has been posted.');
  }
}

// ==========================================================================
// 3. Blog Page dynamic pagination (blog.html)
// ==========================================================================
let currentBlogPage = 1;
let currentBlogSearch = '';
const BLOG_POSTS_PER_PAGE = 4;

function initBlogPage() {
  const grid = document.getElementById('blog-grid-el');
  if (!grid) return;

  renderBlogCards();

  // Live Search binding
  const searchBox = document.getElementById('blog-search-box');
  if (searchBox) {
    searchBox.addEventListener('input', () => {
      currentBlogSearch = searchBox.value.trim().toLowerCase();
      currentBlogPage = 1;
      renderBlogCards();
    });
  }
}

function renderBlogCards() {
  const grid = document.getElementById('blog-grid-el');
  if (!grid) return;

  let postsArray = Object.keys(BLOG_POSTS).map(key => ({
    id: key,
    ...BLOG_POSTS[key]
  }));

  // Apply live search filter if active
  if (currentBlogSearch) {
    postsArray = postsArray.filter(post =>
      post.title.toLowerCase().includes(currentBlogSearch) ||
      post.excerpt.toLowerCase().includes(currentBlogSearch) ||
      post.tag.toLowerCase().includes(currentBlogSearch) ||
      post.author.toLowerCase().includes(currentBlogSearch)
    );
  }

  if (postsArray.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);"><p>No articles found matching "<strong>${currentBlogSearch}</strong>"</p></div>`;
    const container = document.getElementById('blog-pagination-container');
    if (container) container.innerHTML = '';
    return;
  }

  const startIdx = (currentBlogPage - 1) * BLOG_POSTS_PER_PAGE;
  const endIdx = startIdx + BLOG_POSTS_PER_PAGE;
  const visiblePosts = postsArray.slice(startIdx, endIdx);

  grid.innerHTML = visiblePosts.map(post => `
    <article class="blog-card">
      <div class="blog-card-img-wrapper">
        <img src="${post.image}" alt="${post.title}" class="blog-card-img">
      </div>
      <div class="blog-card-body">
        <span class="blog-tag">${post.tag}</span>
        <a href="single-post.html?id=${post.id}" class="blog-card-title">${post.title}</a>
        <p class="blog-excerpt" style="font-size:0.9rem; line-height:1.5; color:var(--text-body);">${post.excerpt}</p>
        <div class="blog-meta" style="margin-top:auto;">
          <span>By ${post.author}</span>
          <span>•</span>
          <span>${post.date}</span>
        </div>
        <a href="single-post.html?id=${post.id}" class="blog-read-more">READ MORE &rsaquo;</a>
      </div>
    </article>
  `).join('\n');

  updateBlogPaginationControls(postsArray.length);
}

function updateBlogPaginationControls(totalPosts) {
  const totalPages = Math.ceil(totalPosts / BLOG_POSTS_PER_PAGE);
  const container = document.getElementById('blog-pagination-container');
  if (!container) return;

  container.innerHTML = `
    <button class="pagination-btn" id="blog-pag-prev" ${currentBlogPage === 1 ? 'disabled' : ''}>&lt; Prev</button>
    ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
      <button class="pagination-btn ${currentBlogPage === page ? 'active' : ''}" data-blog-page="${page}">${page}</button>
    `).join('')}
    <button class="pagination-btn" id="blog-pag-next" ${currentBlogPage === totalPages ? 'disabled' : ''}>Next &gt;</button>
  `;

  // Bind clicks
  container.querySelectorAll('button[data-blog-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentBlogPage = parseInt(btn.dataset.blogPage);
      renderBlogCards();
      document.querySelector('.blog-container')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  container.querySelector('#blog-pag-prev')?.addEventListener('click', () => {
    if (currentBlogPage > 1) {
      currentBlogPage--;
      renderBlogCards();
      document.querySelector('.blog-container')?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  container.querySelector('#blog-pag-next')?.addEventListener('click', () => {
    if (currentBlogPage < totalPages) {
      currentBlogPage++;
      renderBlogCards();
      document.querySelector('.blog-container')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ==========================================================================
// 4. Testimonials Page Logic (testimonials.html) with LOAD MORE
// ==========================================================================
const DEFAULT_TESTIMONIALS = [
  { rating: 5, author: 'James Merritt', role: 'Private Collector', location: 'New York', title: 'Absolute Masterpiece', text: 'The moment I unwrapped the painting I was left speechless. The depth, texture, and sheer presence of the artwork surpassed every expectation. It now hangs in my Manhattan penthouse and every single guest stops to admire it. Anand PKC is without question a master of his craft. This is museum-grade art delivered to your door.' },
  { rating: 5, author: 'Sophia Castellano', role: 'Art Collector', location: 'Chicago', title: 'Acquisition Rivals Sotheby\'s', text: 'I\'ve purchased from Sotheby\'s and Christie\'s — and this acquisition rivals any of them. The provenance, the craftsmanship, the personal attention to detail. From first inquiry to white-glove delivery, every step felt bespoke and luxurious. The oil on linen lion piece is now the crown jewel of my collection. An extraordinary find.' },
  { rating: 5, author: 'Rajiv Kapoor', role: 'Interior Designer', location: 'London', title: 'Luminous Glow and Textures', text: 'The "Mystical Girl" painting transformed my entire living room. Photographs do not do justice to the luminosity of the colours — it almost glows from within. I\'ve received more compliments about this single piece than anything else in my home. Truly investment-grade art from a visionary artist. Will be buying again.' },
  { rating: 5, author: 'Priya Malhotra', role: 'Philanthropist', location: 'Dubai', title: 'An Emotional Connection', text: 'Acquiring the Taj Mahal piece was an emotional experience. It captures something intangible — a spiritual quality I have never seen in contemporary art. My family in India wept when they saw it. The painting carries the soul of the nation. Anand PKC\'s work deserves to be in the world\'s finest galleries. A true once-in-a-lifetime acquisition.' },
  { rating: 5, author: 'David Lau', role: 'CEO', location: 'Hong Kong', title: 'Commanding Boardroom Presence', text: 'My art advisor recommended Art Billionaires and I could not be more grateful. The Hungry White Tiger is commanding, powerful, and breathtaking in person. It dominates my boardroom and conveys exactly the energy I wanted. The investment value is undeniable — three appraisals have already placed it significantly above purchase price. Remarkable.' },
  { rating: 5, author: 'Eleanor Whitney', role: 'Gallery Owner', location: 'Paris', title: 'Breathtaking Brushstrokes', text: 'The Egret painting stopped me in my tracks the moment I saw it online. I worried it might not translate in person — I was wrong. It is even more magnificent. The brush strokes, the tonal depth — nothing in mass-produced art comes close. Art Billionaires has fundamentally changed how I think about collecting. This is the real thing.' },
  { rating: 5, author: 'Marcus Vane', role: 'Private Collector', location: 'San Francisco', title: 'Flawless Framing and Logistics', text: 'Stunning textures and incredible details. The heavy gold-accent frame is a piece of art in its own right. Delivery was fast, safe, and fully insured. I appreciate the certificate of authenticity signed by Anand PKC. A top-tier experience.' },
  { rating: 5, author: 'Dr. Alistair Ross', role: 'Art Connoisseur', location: 'Edinburgh', title: 'Impeccable Color Depth', text: 'The layers of glaze Anand uses on wood panels create a spectacular depth of field. The light catches the gold flakes in the sunset panel in a way that shifts continuously throughout the day. It is an interactive visual experience. Masterful craftsmanship.' },
  { rating: 5, author: 'Charlotte Dubois', role: 'Geneva Collector', location: 'Geneva', title: 'Exquisite Light Interplay', text: 'The light shifts across the impasto textures beautifully in my parlor. A centerpiece of fine craftsmanship. I am truly delighted with this acquisition.' },
  { rating: 5, author: 'Hans-Dieter Wagner', role: 'Fine Art Connoisseur', location: 'Frankfurt', title: 'Exceptional Palette Knife Detail', text: 'I was astounded by the three-dimensional ridges. Anand PKC has mastered the palette knife like no other. Truly museum-quality art.' },
  { rating: 5, author: 'Beatrice Vance', role: 'Art Collector', location: 'Boston', title: 'Museum-Grade Presentation', text: 'Received with white-glove setup. The gold-leaf frame is robust and perfectly selected for the piece. It is a stunning center of attraction.' },
  { rating: 5, author: 'Lord Sebastian Sterling', role: 'Sotheby\'s Patron', location: 'London', title: 'Bespoke Collector Experience', text: 'A seamless acquisition. The signed certificate of authenticity and personal note from the artist add true value to this masterful creation.' },
  { rating: 5, author: 'Kenji Takahashi', role: 'Collector', location: 'Tokyo', title: 'Stunning Cultural Essence', text: 'The wildlife piece evokes contemplation. The heavy textures capture a lifelike spirit that commands attention in my penthouse.' },
  { rating: 5, author: 'Isabella Rossi', role: 'Villa Owner', location: 'Milan', title: 'Unrivaled Textural Landscape', text: 'A glorious addition to my villa. The impasto layers create a tactile depth that changes with the afternoon sun. Spectacular work.' },
  { rating: 5, author: 'Clara Oswald', role: 'Gallery Patron', location: 'Cardiff', title: 'Captivating Light Reflection', text: 'This piece catches every angle of the gallery lighting. Truly a spectacular and investment-grade canvas that stands the test of time.' },
  { rating: 5, author: 'Alexander Mercer', role: 'Collector', location: 'Seattle', title: 'Bold and Commandingly Beautiful', text: 'The textures are incredibly detailed. Hanging this original has elevated my dining space entirely. Excellent communication throughout.' },
  { rating: 5, author: 'Vivienne Westwood', role: 'Showroom Owner', location: 'Vancouver', title: 'Heritage on Wood Panel', text: 'The quality of oil on wood is superb. Anand PKC continues a historical legacy with modern flair. Highly recommended to serious collectors.' },
  { rating: 5, author: 'Nikolai Petrov', role: 'Gallery Director', location: 'Moscow', title: 'Masterful Use of Impasto', text: 'An extraordinary acquisition. The palette knife work on the tiger piece creates a living, breathing presence on the wall. Every visitor to our gallery gallery asks about this painting first.' },
  { rating: 5, author: 'Fatima Al-Rashid', role: 'Art Patron', location: 'Abu Dhabi', title: 'Timeless Investment Grade Art', text: 'As someone who has collected art for twenty years, I can confirm this is investment-grade craftsmanship. The luminosity of the oils and the depth of the wooden panel are simply extraordinary.' },
  { rating: 5, author: 'Thomas Beaumont', role: 'Luxury Interior Designer', location: 'Miami', title: 'Transformed My Clients Home', text: 'I placed the large lion painting above my client\'s fireplace and it instantly became the soul of the room. Every design decision now revolves around it. Anand PKC\'s work elevates entire architectural spaces.' },
  { rating: 5, author: 'Yuki Tanaka', role: 'Collector', location: 'Osaka', title: 'Deeply Moving Brushwork', text: 'The wildlife painting arrived perfectly insured and framed. When I unwrapped it, I was moved to tears by the detail in the eyes of the subject. This is not just art — it is a meditation.' },
  { rating: 4, author: 'Richard Thorne', role: 'Private Collector', location: 'Melbourne', title: 'Wonderful Textures', text: 'The impasto work is phenomenal. Only small criticism is the frame color was slightly darker than it appeared in online catalog photos, but it still looks extremely majestic in my study.' },
  { rating: 4, author: 'Sarah Jenkins', role: 'Art Enthusiast', location: 'Sydney', title: 'Impressive Craftsmanship', text: 'Extremely happy with the overall painting quality. Delivery took a few days longer than expected due to international customs, but the art itself is stunning.' },
  { rating: 4, author: 'Antoine de Saint-Exupéry', role: 'Collector', location: 'Lyon', title: 'Bespoke Detailing', text: 'The canvas ridges are highly defined. A very premium addition to my library. Would have loved a slightly wider frame border, but the gold leaf accent is magnificent.' }
];

let visibleReviewsCount = 6;

function initTestimonialsPage() {
  const grid = document.getElementById('testimonials-grid-el');
  if (!grid) return;

  const storageKey = 'artBillionairesUserReviews';
  let testimonials = [];
  try {
    const stored = localStorage.getItem(storageKey);
    testimonials = stored ? JSON.parse(stored) : [];
  } catch (err) {
    testimonials = [];
  }

  // Prepopulate standard database if none exists or has fewer than 25 reviews (force refresh)
  if (testimonials.length < 25) {
    testimonials = DEFAULT_TESTIMONIALS;
    localStorage.setItem(storageKey, JSON.stringify(testimonials));
  }

  // Render Dashboard scores and bars based on ALL reviews
  updateTestimonialDashboard(testimonials);

  // Render first batch of reviews grid
  renderTestimonialCardsBatch(testimonials);

  // Bind Load More button
  const loadMoreBtn = document.getElementById('load-more-reviews-btn');
  if (loadMoreBtn) {
    if (testimonials.length <= visibleReviewsCount) {
      loadMoreBtn.style.display = 'none';
    }
    
    loadMoreBtn.addEventListener('click', () => {
      visibleReviewsCount += 6;
      renderTestimonialCardsBatch(testimonials);
      if (testimonials.length <= visibleReviewsCount) {
        loadMoreBtn.style.display = 'none';
      }
    });
  }

  // Bind star selector click logic in write form
  initTestimonialForm(storageKey);
}

function updateTestimonialDashboard(reviews) {
  const totalReviews = reviews.length;
  const scoreBig = document.getElementById('dash-score-big');
  const countLabel = document.getElementById('dash-count-label');
  if (!scoreBig) return;

  const totalStars = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avgScore = totalReviews > 0 ? (totalStars / totalReviews).toFixed(1) : '5.0';

  scoreBig.textContent = avgScore;
  countLabel.textContent = `Based on ${totalReviews.toLocaleString()} collector reviews`;

  // Compute percentage levels for 1-5 stars
  for (let s = 1; s <= 5; s++) {
    const starCount = reviews.filter(r => r.rating === s).length;
    const percentage = totalReviews > 0 ? Math.round((starCount / totalReviews) * 100) : 0;
    
    const fillEl = document.getElementById(`star-bar-fill-${s}`);
    const pctEl = document.getElementById(`star-bar-pct-${s}`);
    if (fillEl && pctEl) {
      fillEl.style.width = `${percentage}%`;
      pctEl.textContent = `${percentage}%`;
    }
  }
}

function renderTestimonialCardsBatch(reviews) {
  const grid = document.getElementById('testimonials-grid-el');
  if (!grid) return;

  // Render cards in reverse order (newest first)
  const sortedReviews = [...reviews].reverse();
  const visibleReviews = sortedReviews.slice(0, visibleReviewsCount);

  grid.innerHTML = visibleReviews.map(r => `
    <div class="tcard">
      <div class="tcard-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <p class="tcard-text">
        <strong>${r.title || ''}</strong><br>
        <span class="tcard-short">${r.text.length > 150 ? r.text.substring(0, 150) + '...' : r.text}</span>
        ${r.text.length > 150 ? `<span class="tcard-full" style="display:none;">${r.text.substring(150)}</span>` : ''}
      </p>
      ${r.text.length > 150 ? `<button class="tcard-toggle" aria-expanded="false" style="background:transparent; border:none; color:var(--gold-main); cursor:pointer; font-family:var(--font-sans); font-size:0.85rem; padding:0; margin-top:8px;">Read More</button>` : ''}
      <div class="tcard-author">
        <div class="tcard-avatar">${r.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)}</div>
        <div>
          <div class="tcard-name">${r.author}</div>
          <div class="tcard-role">${r.role || 'Collector'} — ${r.location || 'USA'}</div>
        </div>
      </div>
    </div>
  `).join('\n');

  // Bind read more toggles inside the grid
  grid.querySelectorAll('.tcard-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardText = btn.closest('.tcard').querySelector('.tcard-text');
      const fullTextSpan = cardText.querySelector('.tcard-full');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      if (fullTextSpan) {
        if (isExpanded) {
          fullTextSpan.style.display = 'none';
          btn.textContent = 'Read More';
          btn.setAttribute('aria-expanded', 'false');
        } else {
          fullTextSpan.style.display = 'inline';
          btn.textContent = 'Read Less';
          btn.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });
}

function initTestimonialForm(storageKey) {
  const form = document.getElementById('testimonials-submit-form');
  const stars = document.querySelectorAll('.star-rating-selector span');
  if (!form || stars.length === 0) return;

  let selectedRating = 5; // default 5-stars

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.dataset.starValue);
      selectedRating = val;
      
      // Update active selection classes
      stars.forEach(s => {
        const sVal = parseInt(s.dataset.starValue);
        if (sVal <= val) {
          s.classList.add('selected');
          s.textContent = '★';
        } else {
          s.classList.remove('selected');
          s.textContent = '☆';
        }
      });
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('testi-name').value.trim();
    const role = document.getElementById('testi-role').value.trim() || 'Collector';
    const loc = document.getElementById('testi-location').value.trim() || 'USA';
    const title = document.getElementById('testi-title').value.trim() || 'Exquisite Artwork';
    const text = document.getElementById('testi-message').value.trim();

    if (!name || !text) {
      alert('Please enter both your name and review details.');
      return;
    }

    let reviews = [];
    try {
      reviews = JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch (err) {
      reviews = [];
    }

    const newReview = {
      rating: selectedRating,
      author: name,
      role: role,
      location: loc,
      title: title,
      text: text
    };

    reviews.push(newReview);
    localStorage.setItem(storageKey, JSON.stringify(reviews));

    // Reset fields
    form.reset();
    stars.forEach(s => {
      s.classList.add('selected');
      s.textContent = '★';
    });
    selectedRating = 5;

    // Reset pagination to show the new card
    visibleReviewsCount = reviews.length;
    initTestimonialsPage();

    if (window.showToast) {
      window.showToast('Testimonial submitted successfully!');
    } else {
      alert('Thank you for sharing your experience!');
    }
  });
}

// ==========================================================================
// 5. Gallery Page Filtering & Lightbox (gallery.html)
// ==========================================================================
const ARTWORKS_CATALOG = [
  { title: 'Mystic Horizon', category: 'nature', size: '48 x 36 inches', medium: 'Oil on Wood Panel', year: '2026', price: '4500', image: 'assets/Art Images/mystic-horizon.jpg', desc: 'A breathtaking capture of mountain silhouettes and fading light, utilizing rich palette knife layers.' },
  { title: 'The Royal Roar', category: 'animals', size: '60 x 48 inches', medium: 'Oil on Canvas', year: '2025', price: '6800', image: 'assets/Art Images/The Royal Roar - Oil on Canvas  60 x 48 inches  2013.jpg', desc: 'An intense study of animal strength, featuring micro-textured coats and lifelike expressions.' },
  { title: 'Golden Abstract', category: 'nature', size: '36 x 36 inches', medium: 'Oil & Gold Leaf on Wood', year: '2026', price: '3800', image: 'assets/golden_abstract.png', desc: 'Luxurious abstract textures blended with original gold leaf overlays that shift in varying angles of room lighting.' },
  { title: 'Mystical Girl', category: 'humans', size: '40 x 30 inches', medium: 'Oil on Linen Panel', year: '2026', price: '5200', image: 'assets/Art Images/mystical-girl-slide.jpg', desc: 'A spectacular portrait conveying emotional scale and cultural heritage through fine brush glazes.' },
  { title: 'Taj Mahal', category: 'nature', size: '48 x 36 inches', medium: 'Oil on Wood Panel', year: '2011', price: '7500', image: 'assets/Art Images/Taj Mahal - Oil on Wood  48 x 36 inches  2011.jpg', desc: 'An iconic heritage landmark rendered on solid wood panel, honoring architectural precision and atmospheric light.' },
  { title: 'Serenity in Bloom', category: 'nature', size: '36 x 30 inches', medium: 'Oil on Canvas', year: '2026', price: '3400', image: 'assets/Art Images/serenity-in-bloom.jpg', desc: 'Bold brushwork capturing colorful petals in deep focus, creating a stunning accent for interior rooms.' },
  { title: 'Wild Elegance', category: 'animals', size: '48 x 48 inches', medium: 'Oil on Canvas', year: '2026', price: '5900', image: 'assets/Art Images/Wild Elegance - Oil on Canvas  48 x 48 inches  2010.jpg', desc: 'A majestic canvas depicting forest predators with high-density impasto ridges.' },
  { title: 'Eagle\'s Flight', category: 'birds', size: '40 x 30 inches', medium: 'Oil on Panel', year: '2025', price: '4800', image: 'assets/Art Images/Eagle\'s Flight - Oil on Canvas  36 x 24 inches  2014.jpg', desc: 'A study of dynamic wings and raw power, sculpted with thick steel knives.' },
  { title: 'Solace in Nature', category: 'nature', size: '30 x 30 inches', medium: 'Oil & Panel', year: '2026', price: '3200', image: 'assets/serenity_in_nature.png', desc: 'Calming forest path rendered with rich glazes, invoking deep peace.' },
  { title: 'The Scholar', category: 'humans', size: '48 x 36 inches', medium: 'Oil on Board', year: '2024', price: '5500', image: 'assets/Art Images/The Scholar - Oil on Canvas  48 x 36 inches  2012.jpg', desc: 'Thoughtful portrait study focusing on facial contours, fabric folds, and shadows.' },
  { title: 'Evening Calm', category: 'nature', size: '24 x 36 inches', medium: 'Oil on Panel', year: '2026', price: '2900', image: 'assets/evening_calm.png', desc: 'Soothing lakeside landscape under twilight glow.' },
  { title: 'Lion Heart', category: 'animals', size: '50 x 40 inches', medium: 'Oil on Canvas', year: '2025', price: '6400', image: 'assets/Art Images/Lion\'s Majesty - Oil on Canvas  60 x 48 inches  2013.jpg', desc: 'A high-impact study of a male lion, showcasing thick palette ridges in the mane.' },
  { title: 'Timeless Blooms', category: 'nature', size: '30 x 24 inches', medium: 'Oil on Panel', year: '2026', price: '2700', image: 'assets/timeless_blooms.png', desc: 'Richly textured roses rendered using Renaissance glazing techniques.' },
  { title: 'Midnight Hunt', category: 'animals', size: '48 x 36 inches', medium: 'Oil on Wood', year: '2026', price: '4900', image: 'assets/Art Images/Midnight Hunt - Oil on Wood  48 x 36 inches  2012.jpg', desc: 'Deep dark tones framing a pack of wolves traversing snowy woods.' },
  { title: 'Spiritual Flight', category: 'birds', size: '36 x 24 inches', medium: 'Oil on Linen', year: '2025', price: '4200', image: 'assets/Art Images/Spiritual Flight - Oil on Wood  36 x 24 inches  2012.jpg', desc: 'Elegant cranes lifting off a misty marshland.' },
  { title: 'The Weaver', category: 'humans', size: '40 x 30 inches', medium: 'Oil on Canvas', year: '2026', price: '5100', image: 'assets/Art Images/The Weaver - Oil on Canvas  40 x 30 inches  2011.jpg', desc: 'A rich portrait showcasing traditional loom weaving details.' }
];

function initGalleryPage() {
  const tabs = document.querySelectorAll('.gallery-filter-btn');
  if (tabs.length === 0) return;

  // Render initial catalog
  renderGalleryCards(ARTWORKS_CATALOG);

  // Tab filter trigger
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.dataset.filter;
      const filtered = filterVal === 'all' 
        ? ARTWORKS_CATALOG 
        : ARTWORKS_CATALOG.filter(art => art.category === filterVal);

      // Smooth fade transition
      const grid = document.getElementById('gallery-grid-el');
      if (grid) {
        grid.style.opacity = '0';
        setTimeout(() => {
          renderGalleryCards(filtered);
          grid.style.opacity = '1';
        }, 150);
      }
    });
  });

  // Lightbox close binds
  const lightbox = document.getElementById('gallery-lightbox');
  const closeBtn = document.querySelector('.js-lightbox-close');
  
  closeBtn?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Lightbox Zoom Click Toggle
  const lightboxImg = document.getElementById('lightbox-img-el');
  lightboxImg?.addEventListener('click', () => {
    lightboxImg.classList.toggle('zoomed');
    if (lightboxImg.classList.contains('zoomed')) {
      lightboxImg.style.transform = 'scale(1.4)';
      lightboxImg.style.cursor = 'zoom-out';
    } else {
      lightboxImg.style.transform = 'none';
      lightboxImg.style.cursor = 'zoom-in';
    }
  });

  // Bind interactive Video Play Overlays and Pagination
  initGalleryVideoClicks();
  initVideoPagination();
}

function renderGalleryCards(artworks) {
  const grid = document.getElementById('gallery-grid-el');
  if (!grid) return;

  if (artworks.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--text-muted); font-family: var(--font-serif);">No artworks found in this category.</div>`;
    return;
  }

  grid.innerHTML = artworks.map((art, idx) => `
    <div class="gallery-card" data-index="${idx}" data-category="${art.category}">
      <div class="gallery-card-img-wrapper">
        <img src="${art.image}" alt="${art.title}" class="gallery-card-img" loading="lazy">
        <div class="gallery-card-frame"></div>
      </div>
      <div class="gallery-card-overlay">
        <h3 class="gallery-card-title">${art.title}</h3>
        <span class="gallery-card-desc">${art.medium} • ${art.size}</span>
      </div>
    </div>
  `).join('\n');

  // Bind card clicks to open Lightbox
  grid.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.gallery-card-title').textContent;
      const selectedArtwork = artworks.find(a => a.title === title);
      if (selectedArtwork) {
        openLightbox(selectedArtwork);
      }
    });
  });
}

function openLightbox(art) {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  // Populate lightbox fields
  document.getElementById('lightbox-title-el').textContent = art.title;
  document.getElementById('lightbox-desc-el').textContent = art.desc;
  
  // Specs
  document.getElementById('lightbox-spec-size').textContent = art.size;
  document.getElementById('lightbox-spec-medium').textContent = art.medium;
  document.getElementById('lightbox-spec-category').textContent = art.category;
  document.getElementById('lightbox-spec-year').textContent = art.year;
  
  // Image element reset zoom
  const img = document.getElementById('lightbox-img-el');
  img.src = art.image;
  img.alt = art.title;
  img.classList.remove('zoomed');
  img.style.transform = 'none';
  img.style.cursor = 'zoom-in';

  // Buy Now button bridge
  const buyBtn = document.getElementById('lightbox-buy-btn');
  if (buyBtn) {
    buyBtn.setAttribute('data-title', art.title);
    buyBtn.setAttribute('data-price', art.price);
    buyBtn.setAttribute('data-image', art.image);
  }

  // Add to Wishlist button bridge
  const wishBtn = document.getElementById('lightbox-wishlist-btn');
  if (wishBtn) {
    wishBtn.setAttribute('data-title', art.title);
    wishBtn.setAttribute('data-price', art.price);
    wishBtn.setAttribute('data-image', art.image);
  }

  // WhatsApp inquiry composition link
  const whatsappBtn = document.getElementById('lightbox-whatsapp-btn');
  if (whatsappBtn) {
    const textMsg = encodeURIComponent(`Hello Art Billionaires, I am interested in acquiring the original painting "${art.title}" (${art.size}, ${art.medium}). Please provide details regarding price and shipping.`);
    whatsappBtn.href = `https://wa.me/19789301495?text=${textMsg}`;
  }

  // Display lightbox modal
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // stop scroll background
}

function closeLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // restore scroll
  }
}

// ==========================================================================
// 6. Video Players clicks & Pagination (gallery.html)
// ==========================================================================
function initGalleryVideoClicks() {
  const videoConfigs = [
    { overlayId: 'gallery-video-overlay-1', containerId: 'gallery-video-container-1', embedUrl: 'https://www.youtube.com/embed/X-pEUiJoeVM?autoplay=1&rel=0', title: 'Truly Artfelt Video' },
    { overlayId: 'gallery-video-overlay-2', containerId: 'gallery-video-container-2', embedUrl: 'https://www.youtube.com/embed/HHSGL5xkppU?autoplay=1&rel=0', title: 'World Class Oil Paintings by Anand PKC' },
    { overlayId: 'gallery-video-overlay-3', containerId: 'gallery-video-container-3', embedUrl: 'https://www.youtube.com/embed/CIDhbnt3GeI?autoplay=1&rel=0', title: 'Once Upon a Time in America' },
    { overlayId: 'gallery-video-overlay-4', containerId: 'gallery-video-container-4', embedUrl: 'https://www.youtube.com/embed/v5SR6sUa6Nc?autoplay=1&rel=0', title: 'New York City, USA Art Showcase' },
    { overlayId: 'gallery-video-overlay-5', containerId: 'gallery-video-container-5', embedUrl: 'https://www.youtube.com/embed/t_3F1gG48kY?autoplay=1&rel=0', title: 'Impasto Palette Knife Technique' },
    { overlayId: 'gallery-video-overlay-6', containerId: 'gallery-video-container-6', embedUrl: 'https://www.youtube.com/embed/n8j2P8GfR3Q?autoplay=1&rel=0', title: 'Behind the Easel: Museum Textures' }
  ];

  videoConfigs.forEach(conf => {
    const overlay = document.getElementById(conf.overlayId);
    const container = document.getElementById(conf.containerId);
    
    if (overlay && container) {
      overlay.addEventListener('click', () => {
        container.innerHTML = `
          <iframe 
            class="video-player" 
            src="${conf.embedUrl}" 
            title="${conf.title}"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
            style="width: 100%; height: 100%; object-fit: cover; display: block; border: none;">
          </iframe>
        `;
      });
    }
  });
}

// Gallery Videos Pagination Toggle
let currentVideoPage = 1;

function initVideoPagination() {
  const container = document.getElementById('video-pagination-container');
  if (!container) return;

  showVideosForPage();

  container.querySelectorAll('button[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentVideoPage = parseInt(btn.dataset.page);
      showVideosForPage();
      updateVideoPaginationControls();
    });
  });

  const prevBtn = document.getElementById('video-pagination-prev');
  prevBtn?.addEventListener('click', () => {
    if (currentVideoPage > 1) {
      currentVideoPage--;
      showVideosForPage();
      updateVideoPaginationControls();
    }
  });

  const nextBtn = document.getElementById('video-pagination-next');
  nextBtn?.addEventListener('click', () => {
    if (currentVideoPage < 2) {
      currentVideoPage++;
      showVideosForPage();
      updateVideoPaginationControls();
    }
  });
}

function showVideosForPage() {
  const videos = document.querySelectorAll('.additional-video-card');
  if (videos.length === 0) return;

  // Page 1: first 4 videos (index 0 to 3)
  // Page 2: remaining 2 videos (index 4 and 5)
  videos.forEach((video, idx) => {
    if (currentVideoPage === 1) {
      if (idx < 4) {
        video.style.display = 'block';
      } else {
        video.style.display = 'none';
      }
    } else {
      if (idx >= 4) {
        video.style.display = 'block';
      } else {
        video.style.display = 'none';
      }
    }
  });
}

function updateVideoPaginationControls() {
  const container = document.getElementById('video-pagination-container');
  if (!container) return;

  const prevBtn = document.getElementById('video-pagination-prev');
  const nextBtn = document.getElementById('video-pagination-next');

  if (prevBtn) prevBtn.disabled = currentVideoPage === 1;
  if (nextBtn) nextBtn.disabled = currentVideoPage === 2;

  container.querySelectorAll('button[data-page]').forEach(btn => {
    const pageNum = parseInt(btn.dataset.page);
    if (pageNum === currentVideoPage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelector('.video-showcase-section')?.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================================================
// 7. Event bridges for Cart and Wishlist (triggers hidden buttons)
// ==========================================================================
function bindLightboxBridges() {
  document.body.addEventListener('click', (e) => {
    const buyBtn = e.target.closest('#lightbox-buy-btn');
    if (buyBtn) {
      const title = buyBtn.getAttribute('data-title');
      const price = buyBtn.getAttribute('data-price');
      const image = buyBtn.getAttribute('data-image');

      const trigger = document.getElementById('hidden-cart-trigger');
      if (trigger) {
        trigger.setAttribute('data-product-title', title);
        trigger.setAttribute('data-product-price', price);
        trigger.setAttribute('data-product-image', image);
        closeLightbox();
        trigger.click();
      }
    }

    const wishBtn = e.target.closest('#lightbox-wishlist-btn');
    if (wishBtn) {
      const title = wishBtn.getAttribute('data-title');
      const price = wishBtn.getAttribute('data-price');
      const image = wishBtn.getAttribute('data-image');

      const trigger = document.getElementById('hidden-wishlist-trigger');
      if (trigger) {
        trigger.setAttribute('data-product-title', title);
        trigger.setAttribute('data-product-price', price);
        trigger.setAttribute('data-product-image', image);
        closeLightbox();
        trigger.click();
      }
    }
  });
}

// ==========================================================================
// 8. Global Initializer
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initBlogPage();
  initSinglePost();
  initTestimonialsPage();
  initGalleryPage();
  bindLightboxBridges();
});
