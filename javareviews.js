var reviews = [];

if (localStorage.getItem('fragranceReviews') !== null) {
    reviews = JSON.parse(localStorage.getItem('fragranceReviews'));
}

if (reviews.length === 0) {

    reviews = [
        {
            id: 1001,
            name: 'Hermoine G.',
            rating: 5,
            type: 'positive',
            text: 'Absolutely love this fragrance! It lasts all day and everyone compliments me when I wear it.',
            date: '15/08/2026 14:30'
        },
        {
            id: 1002,
            name: 'Harry P.',
            rating: 4,
            type: 'positive',
            text: 'Great quality perfume. The scent is exactly what I was looking for. Shipping was fast too!',
            date: '14/08/2026 09:15'
        },
        {
            id: 1003,
            name: 'Anonymous',
            rating: 3,
            type: 'neutral',
            text: 'The fragrance is nice but it does not last as long as I expected.',
            date: '12/08/2026 18:45'
        },
        {
            id: 1004,
            name: 'Draco M.',
            rating: 1,
            type: 'complaint',
            text: 'Very disappointed. The bottle arrived damaged and the scent was not what I expected. My father will hear about this!',
            date: '08/08/2026 16:00'
        },
        {
            id: 1005,
            name: 'Ron W.',
            rating: 4,
            type: 'neutral',
            text: 'Good perfume but a bit pricey for the size. I might buy again if there is a sale.',
            date: '06/08/2026 10:30'
        }
    ];

    localStorage.setItem('fragranceReviews', JSON.stringify(reviews));
}

function getStarHTML(rating) {
    var stars = '';
    for (var i = 0; i < rating; i = i + 1) {
        stars = stars + '★';
    }
    for (var i = rating; i < 5; i = i + 1) {
        stars = stars + '☆';
    }
    return stars;
}

function getTypeBadge(type) {
    if (type === 'positive') {
        return '<span class="review-type-badge positive">❤️ Positive</span>';
    } else if (type === 'neutral') {
        return '<span class="review-type-badge neutral">💚 Neutral</span>';
    } else if (type === 'complaint') {
        return '<span class="review-type-badge complaint">💔 Complaint</span>';
    } else {
        return '';
    }
}

function displayReviews() {
    var reviewsList = document.getElementById('reviewsList');
    var reviewCount = document.getElementById('reviewCount');

    reviewsList.innerHTML = '';
    reviewCount.textContent = reviews.length;

    if (reviews.length === 0) {
        reviewsList.innerHTML = '<div class="empty-state"><span class="emoji">📭</span><p>No reviews yet. Be the first to share your fragrance experience!</p></div>';
        return;
    }

    for (var i = reviews.length - 1; i >= 0; i = i - 1) {
        var review = reviews[i];
        var card = document.createElement('div');
        card.className = 'review-card';

        if (review.type === 'complaint') {
            card.className = card.className + ' complaint';
        }

        card.innerHTML =
            '<div class="review-top">' +
                '<span class="review-stars">' + getStarHTML(review.rating) + '</span>' +
                '<span class="review-name">' + review.name + '</span>' +
                '<span class="review-date">' + review.date + '</span>' +
            '</div>' +
            '<div class="review-text">' + review.text + '</div>' +
            getTypeBadge(review.type);

        reviewsList.appendChild(card);
    }
}

var form = document.getElementById('reviewForm');
var nameInput = document.getElementById('reviewerName');
var ratingInputs = document.querySelectorAll('input[name="rating"]');
var reviewType = document.getElementById('reviewType');
var reviewText = document.getElementById('reviewText');
var charCount = document.getElementById('charCount');
var ratingError = document.getElementById('ratingError');
var textError = document.getElementById('textError');

reviewText.oninput = function() {
    var count = this.value.length;
    var max = this.maxLength;
    charCount.textContent = count + ' / ' + max + ' characters';
    charCount.className = 'char-count';
    if (count > max * 0.9) {
        charCount.classList.add('danger');
    } else if (count > max * 0.7) {
        charCount.classList.add('warning');
    }
};

form.onsubmit = function(e) {
    e.preventDefault();

    var rating = 0;
    for (var i = 0; i < ratingInputs.length; i = i + 1) {
        if (ratingInputs[i].checked === true) {
            rating = parseInt(ratingInputs[i].value);
        }
    }

    var isValid = true;

    if (rating === 0) {
        ratingError.className = 'error-msg show';
        isValid = false;
    } else {
        ratingError.className = 'error-msg';
    }

    if (reviewText.value.trim() === '') {
        textError.className = 'error-msg show';
        isValid = false;
    } else {
        textError.className = 'error-msg';
    }

    if (isValid === false) {
        alert('Please select a rating and write your review.');
        return;
    }

    var name = nameInput.value.trim();
    if (name === '') {
        name = 'Anonymous';
    }

    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    var dayStr = day;
    if (day < 10) {
        dayStr = '0' + day;
    }
    var monthStr = month;
    if (month < 10) {
        monthStr = '0' + month;
    }
    var hoursStr = hours;
    if (hours < 10) {
        hoursStr = '0' + hours;
    }
    var minutesStr = minutes;
    if (minutes < 10) {
        minutesStr = '0' + minutes;
    }

    var dateStr = dayStr + '/' + monthStr + '/' + year + ' ' + hoursStr + ':' + minutesStr;

    var review = {
        id: Date.now(),
        name: name,
        rating: rating,
        type: reviewType.value,
        text: reviewText.value.trim(),
        date: dateStr
    };

    reviews.push(review);
    localStorage.setItem('fragranceReviews', JSON.stringify(reviews));

    displayReviews();

    form.reset();
    for (var i = 0; i < ratingInputs.length; i = i + 1) {
        ratingInputs[i].checked = false;
    }

    charCount.textContent = '0 / 500 characters';
    charCount.className = 'char-count';

    alert('Review submitted successfully!');
};

displayReviews();