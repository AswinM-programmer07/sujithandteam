// Script to handle login, navigation, form submission, and storage
let currentUsername = localStorage.getItem('currentUsername');

// Login Function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        if (password === 'test') {
            localStorage.setItem('currentUsername', username);
            currentUsername = username;
            window.location.href = 'home.html';
        } else {
            alert('Wrong password');
        }
    }
}

// Navigation Functions
function navigateToBook() {
    window.location.href = 'book.html';
}

// Submitting Storage Form and Saving Data
function submitStorageForm() {
    const image = document.getElementById('image').files[0];
    const cost = document.getElementById('cost').value;
    const area = document.getElementById('area').value;
    const location = document.getElementById('location').value;
    const type = document.getElementById('storage-type').value;

    // Validate inputs
    if (!image || !cost || !area || !location || !type) {
        alert('Please fill all fields.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const listings = JSON.parse(localStorage.getItem('listings') || '[]');
        listings.push({
            userId: currentUsername,
            image: e.target.result,
            cost,
            area,
            location,
            type,
            sold: false
        });
        localStorage.setItem('listings', JSON.stringify(listings));
        window.location.href = 'listings.html';
    };
    reader.readAsDataURL(image);
}

// Display Listings on Listings Page
function loadListings() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const listingContainer = document.getElementById('listing-container');
    listingContainer.innerHTML = listings.map((listing, index) => `
        <div class="card" onclick="viewDetails(${index})">
            <img src="${listing.image}" alt="Storage Image" style="width:100%;">
            <h3>${listing.type}</h3>
            <p>Location: ${listing.location}</p>
            <p>Cost: $${listing.cost}/day</p>
        </div>
    `).join('');
}

// View Details Function
function viewDetails(index) {
    localStorage.setItem('currentListing', index);
    window.location.href = 'details.html';
}

// Load Details Page Data
function loadDetails() {
    const listings = JSON.parse(localStorage.getItem('listings'));
    const index = localStorage.getItem('currentListing');
    const listing = listings[index];
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        <img src="${listing.image}" alt="Storage Image" style="width:100%;">
        <h3>${listing.type}</h3>
        <p>Location: ${listing.location}</p>
        <p>Cost: $${listing.cost}/day</p>
        <p>Area: ${listing.area}</p>
        <p>User: ${listing.userId}</p>
    `;
}

// Book Storage Function
function bookStorage() {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings'));
    listings[index].sold = true;
    localStorage.setItem('listings', JSON.stringify(listings));
    alert('Space booked successfully!');
    window.location.href = 'listings.html';
}

// Filtering Listings
function filterListings() {
    const search = document.getElementById('search').value.toLowerCase();
    const typeFilter = document.getElementById('type-filter').value;
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const filtered = listings.filter(listing => {
        const matchesSearch = listing.location.toLowerCase().includes(search);
        const matchesType = typeFilter ? listing.type === typeFilter : true;
        return matchesSearch && matchesType;
    });
    document.getElementById('listing-container').innerHTML = filtered.map((listing, index) => `
        <div class="card" onclick="viewDetails(${index})">
            <img src="${listing.image}" alt="Storage Image" style="width:100%;">
            <h3>${listing.type}</h3>
            <p>Location: ${listing.location}</p>
            <p>Cost: $${listing.cost}/day</p>
        </div>
    `).join('');
}
// Load Details Page Data
function loadDetails() {
    const listings = JSON.parse(localStorage.getItem('listings'));
    const index = localStorage.getItem('currentListing');
    const listing = listings[index];
    const detailsContainer = document.getElementById('details-container');
    const starsContainer = document.getElementById('stars');
    
    detailsContainer.innerHTML = `
        <img src="${listing.image}" alt="Storage Image" style="width:100%;">
        <h3>${listing.type}</h3>
        <p>Location: ${listing.location}</p>
        <p>Cost: $${listing.cost}/day</p>
        <p>Area: ${listing.area}</p>
        <p>User: ${listing.userId}</p>
        <p>${listing.sold ? "<strong>Sold</strong>" : ""}</p>
    `;

    // Load any previously stored rating
    const rating = listing.rating || 0;
    highlightStars(rating);
}

// Book Storage Function
function bookStorage() {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings'));
    listings[index].sold = true;
    localStorage.setItem('listings', JSON.stringify(listings));
    alert('Space booked successfully!');
    window.location.href = 'listings.html';
}

// Rating Functions
function setRating(rating) {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings'));
    
    listings[index].rating = rating;  // Save rating in the listing object
    localStorage.setItem('listings', JSON.stringify(listings));  // Update localStorage
    highlightStars(rating);  // Update stars display
}

function highlightStars(rating) {
    // Get all star elements
    const stars = document.querySelectorAll('#stars .star');
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('selected', starValue <= rating);  // Highlight based on rating
    });
}


// Load Details Page Data
function loadDetails() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const index = localStorage.getItem('currentListing');
    const listing = listings[index];
    const detailsContainer = document.getElementById('details-container');
    
    detailsContainer.innerHTML = `
        <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 300px;">
        <h3>Type: ${listing.type}</h3>
        <p>Location: ${listing.location}</p>
        <p>Cost: $${listing.cost}/day</p>
        <p>Area: ${listing.area}</p>
        <p>User: ${listing.userId}</p>
        <p>${listing.sold ? "<strong>Sold</strong>" : ""}</p>
    `;

    // Show stored rating if it exists
    const rating = listing.rating || 0;
    highlightStars(rating);
}

// Book Storage Function
function bookStorage() {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    listings[index].sold = true;
    localStorage.setItem('listings', JSON.stringify(listings));
    alert('Space booked successfully!');
    window.location.href = 'listings.html';
}

// Rating Functions
function setRating(rating) {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    
    listings[index].rating = rating;  // Save rating in the listing object
    localStorage.setItem('listings', JSON.stringify(listings));  // Update localStorage
    highlightStars(rating);  // Update stars display
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('#stars .star');
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('selected', starValue <= rating);
    });
}

// Load Listings and Show in Listings Page
function loadListings() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const listingContainer = document.getElementById('listing-container');
    
    listingContainer.innerHTML = listings.map((listing, index) => `
        <div class="card ${listing.sold ? 'sold-card' : ''}" onclick="viewDetails(${index})">
            <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
            <h3>${listing.type}</h3>
            <p>Location: ${listing.location}</p>
            <p>Cost: $${listing.cost}/day</p>
            <p>Rating: ${getStars(listing.rating)}</p>
        </div>
    `).join('');
}

// Function to show stars based on the rating value
function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }
    return stars;
}

// View Details Function
function viewDetails(index) {
    localStorage.setItem('currentListing', index);
    window.location.href = 'details.html';
}

// Filter Listings by Type and Location
function filterListings() {
    const search = document.getElementById('search').value.toLowerCase();
    const typeFilter = document.getElementById('type-filter').value;
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const filtered = listings.filter(listing => {
        const matchesSearch = listing.location.toLowerCase().includes(search);
        const matchesType = typeFilter ? listing.type === typeFilter : true;
        return matchesSearch && matchesType;
    });
    document.getElementById('listing-container').innerHTML = filtered.map((listing, index) => `
        <div class="card ${listing.sold ? 'sold-card' : ''}" onclick="viewDetails(${index})">
            <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
            <h3>${listing.type}</h3>
            <p>Location: ${listing.location}</p>
            <p>Cost: $${listing.cost}/day</p>
            <p>Rating: ${getStars(listing.rating)}</p>
        </div>
    `).join('');
}

// Load Details Page Data
function loadDetails() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const index = localStorage.getItem('currentListing');
    const listing = listings[index];
    const detailsContainer = document.getElementById('details-container');
    
    detailsContainer.innerHTML = `
        <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 300px;">
        <h3>Type: ${listing.type}</h3>
        <p>Location: ${listing.location}</p>
        <p>Cost per Day: $${listing.cost}</p>
        <p>Area: ${listing.area} sq ft</p>
        <p>User ID: ${listing.userId}</p>
        <p>${listing.sold ? "<strong>Sold</strong>" : ""}</p>
    `;

    // Display stored rating if it exists
    const rating = listing.rating || 0;
    highlightStars(rating);
}

// Book Storage Function
function bookStorage() {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    listings[index].sold = true;
    localStorage.setItem('listings', JSON.stringify(listings));
    alert('Space booked successfully!');
    window.location.href = 'listings.html';
}

// Rating Functions
function setRating(rating) {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    
    listings[index].rating = rating;  // Save rating in the listing object
    localStorage.setItem('listings', JSON.stringify(listings));  // Update localStorage
    highlightStars(rating);  // Update stars display
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('#stars .star');
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('selected', starValue <= rating);
    });
}

// Load Listings and Display Cards in Listings Page
function loadListings() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const listingContainer = document.getElementById('listing-container');
    
    listingContainer.innerHTML = listings.map((listing, index) => `
        <div class="card ${listing.sold ? 'sold-card' : ''}" onclick="viewDetails(${index})">
            <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
            <h3>${listing.type}</h3>
            <p>Location: ${listing.location}</p>
            <p>Cost per Day: $${listing.cost}</p>
            <p>Rating: ${getStars(listing.rating)}</p>
        </div>
    `).join('');
}

// Function to display stars based on the rating
function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }
    return stars;
}

// View Details Function
function viewDetails(index) {
    localStorage.setItem('currentListing', index);
    window.location.href = 'details.html';
}

// Filter Listings by Type and Location
function filterListings() {
    const search = document.getElementById('search').value.toLowerCase();
    const typeFilter = document.getElementById('type-filter').value;
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const filtered = listings.filter(listing => {
        const matchesSearch = listing.location.toLowerCase().includes(search);
        const matchesType = typeFilter ? listing.type === typeFilter : true;
        return matchesSearch && matchesType;
    });
    document.getElementById('listing-container').innerHTML = filtered.map((listing, index) => `
        <div class="card ${listing.sold ? 'sold-card' : ''}" onclick="viewDetails(${index})">
            <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
            <h3>${listing.type}</h3>
            <p>Location: ${listing.location}</p>
            <p>Cost per Day: $${listing.cost}</p>
            <p>Rating: ${getStars(listing.rating)}</p>
        </div>
    `).join('');
}


// Load Details Page Data
function loadDetails() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const index = localStorage.getItem('currentListing');
    const listing = listings[index];
    const detailsContainer = document.getElementById('details-container');
    
    detailsContainer.innerHTML = `
        <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 300px;">
        <h3>Type: ${listing.type}</h3>
        <p>Location: ${listing.location}</p>
        <p>Cost per Day: $${listing.cost}</p>
        <p>Area: ${listing.area} sq ft</p>
        <p>User ID: ${listing.userId}</p>
        <p>${listing.sold ? "<strong>Sold</strong>" : ""}</p>
    `;

    // Display stored rating if it exists
    const rating = listing.rating || 0;
    highlightStars(rating);
}

// Book Storage Function
function bookStorage() {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    listings[index].sold = true;
    localStorage.setItem('listings', JSON.stringify(listings));
    alert('Space booked successfully!');
    window.location.href = 'listings.html';
}

// Rating Functions
function setRating(rating) {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    
    listings[index].rating = rating;  // Save rating in the listing object
    localStorage.setItem('listings', JSON.stringify(listings));  // Update localStorage
    highlightStars(rating);  // Update stars display
    loadListings();  // Reload listings to reflect the new rating on cards
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('#stars .star');
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('selected', starValue <= rating);
    });
}

// Load Listings and Show in Listings Page
function loadListings() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const listingContainer = document.getElementById('listing-container');
    
    listingContainer.innerHTML = listings.map((listing, index) => `
        <div class="card ${listing.sold ? 'sold-card' : ''}" onclick="viewDetails(${index})">
            <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
            <h3>${listing.type}</h3>
            <p>Location: ${listing.location}</p>
            <p>Cost per Day: $${listing.cost}</p>
            <p>Rating: ${getStars(listing.rating)}</p>
        </div>
    `).join('');
}

// Function to show stars based on the rating value
function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }
    return stars;
}

// View Details Function
function viewDetails(index) {
    localStorage.setItem('currentListing', index);
    window.location.href = 'details.html';
}

// Filter Listings by Type and Location
function filterListings() {
    const search = document.getElementById('search').value.toLowerCase();
    const typeFilter = document.getElementById('type-filter').value;
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const filtered = listings.filter(listing => {
        const matchesSearch = listing.location.toLowerCase().includes(search);
        const matchesType = typeFilter ? listing.type === typeFilter : true;
        return matchesSearch && matchesType;
    });
    document.getElementById('listing-container').innerHTML = filtered.map((listing, index) => `
        <div class="card ${listing.sold ? 'sold-card' : ''}" onclick="viewDetails(${index})">
            <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
            <h3>${listing.type}</h3>
            <p>Location: ${listing.location}</p>
            <p>Cost per Day: $${listing.cost}</p>
            <p>Rating: ${getStars(listing.rating)}</p>
        </div>
    `).join('');
}

// Load Details Page Data
function loadDetails() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const index = localStorage.getItem('currentListing');
    const listing = listings[index];
    const detailsContainer = document.getElementById('details-container');
    
    detailsContainer.innerHTML = `
        <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 300px;">
        <h3>Type: ${listing.type}</h3>
        <p>Location: ${listing.location}</p>
        <p>Cost per Day: $${listing.cost}</p>
        <p>Area: ${listing.area} sq ft</p>
        <p>User ID: ${listing.userId}</p>
    `;

    // Display stored rating if it exists
    const rating = listing.rating || 0;
    highlightStars(rating);

    // Conditionally show Book or Open button
    const actionButtonContainer = document.getElementById('action-button');
    if (listing.sold) {
        actionButtonContainer.innerHTML = `<button onclick="openStorage()">Open</button>`;
    } else {
        actionButtonContainer.innerHTML = `<button onclick="bookStorage()">Book</button>`;
    }
}

// Book Storage Function
function bookStorage() {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    listings[index].sold = true; // Mark as sold
    listings[index].bookedBy = currentUsername; // Save the booking user
    localStorage.setItem('listings', JSON.stringify(listings));
    alert('Space booked successfully!');
    loadDetails();  // Reload details to toggle button
    loadListings(); // Reload listings to reflect the change on the card
}

// Open Storage Function
function openStorage() {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    
    // Ensure only the original user can open it
    if (listings[index].bookedBy === currentUsername) {
        listings[index].sold = false; // Mark as available
        delete listings[index].bookedBy; // Remove booking user
        localStorage.setItem('listings', JSON.stringify(listings));
        alert('Storage space opened successfully!');
        loadDetails();  // Reload details to toggle button
        loadListings(); // Reload listings to reflect the change on the card
    } else {
        alert("You don't have permission to open this storage.");
    }
}

// Rating Functions
function setRating(rating) {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    
    listings[index].rating = rating;  // Save rating in the listing object
    localStorage.setItem('listings', JSON.stringify(listings));  // Update localStorage
    highlightStars(rating);  // Update stars display
    loadListings();  // Reload listings to reflect the new rating on cards
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('#stars .star');
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('selected', starValue <= rating);
    });
}

// Load Listings and Show in Listings Page
function loadListings() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const listingContainer = document.getElementById('listing-container');
    
    listingContainer.innerHTML = listings.map((listing, index) => `
        <div class="card ${listing.sold ? 'sold-card' : ''}" onclick="viewDetails(${index})">
            <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
            <h3>${listing.type}</h3>
            <p>Location: ${listing.location}</p>
            <p>Cost per Day: $${listing.cost}</p>
            <p>Rating: ${getStars(listing.rating)}</p>
        </div>
    `).join('');
}

// Function to show stars based on the rating value
function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }
    return stars;
}

// View Details Function
function viewDetails(index) {
    localStorage.setItem('currentListing', index);
    window.location.href = 'details.html';
}

// Filter Listings by Type and Location
function filterListings() {
    const search = document.getElementById('search').value.toLowerCase();
    const typeFilter = document.getElementById('type-filter').value;
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const filtered = listings.filter(listing => {
        const matchesSearch = listing.location.toLowerCase().includes(search);
        const matchesType = typeFilter ? listing.type === typeFilter : true;
        return matchesSearch && matchesType;
    });
    document.getElementById('listing-container').innerHTML = filtered.map((listing, index) => `
        <div class="card ${listing.sold ? 'sold-card' : ''}" onclick="viewDetails(${index})">
            <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
            <h3>${listing.type}</h3>
            <p>Location: ${listing.location}</p>
            <p>Cost per Day: $${listing.cost}</p>
            <p>Rating: ${getStars(listing.rating)}</p>
        </div>
    `).join('');
}

// Load Booked Cards for the Current User in reopen.html
function loadUserBookings() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const reopenContainer = document.getElementById('reopen-container');

    // Filter listings by current user's bookings
    const userBookings = listings.filter(listing => listing.sold && listing.userId === currentUsername);

    if (userBookings.length === 0) {
        reopenContainer.innerHTML = "<p>No bookings to reopen.</p>";
    } else {
        // Display user bookings with a Reopen button
        reopenContainer.innerHTML = userBookings.map((listing, index) => `
            <div class="card sold-card" onclick="reopenStorage(${index})">
                <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
                <h3>${listing.type}</h3>
                <p>Location: ${listing.location}</p>
                <p>Cost per Day: $${listing.cost}</p>
            </div>
        `).join('');
    }
}

// Reopen Storage (Make it available again)
function reopenStorage(index) {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');

    // Check if the current user is the one who booked this storage
    if (listings[index].userId === currentUsername) {
        listings[index].sold = false; // Mark as available
        delete listings[index].userId; // Remove booking user ID

        localStorage.setItem('listings', JSON.stringify(listings));
        alert('Storage space reopened successfully!');
        loadUserBookings(); // Reload the page to update the list
    } else {
        alert("You don't have permission to reopen this storage.");
    }
}

// Load Listings for Listings Page
function loadListings() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const listingContainer = document.getElementById('listing-container');
    
    listingContainer.innerHTML = listings.map((listing, index) => `
        <div class="card ${listing.sold ? 'sold-card' : ''}" onclick="viewDetails(${index})">
            <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
            <h3>${listing.type}</h3>
            <p>Location: ${listing.location}</p>
            <p>Cost per Day: $${listing.cost}</p>
        </div>
    `).join('');
}

// View Details Function (For Listings Page)
function viewDetails(index) {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const listing = listings[index];
    
    // Allow access only if the storage is available or if the user is the one who booked it
    if (!listing.sold || listing.userId === currentUsername) {
        localStorage.setItem('currentListing', index);
        window.location.href = 'details.html';
    } else {
        alert("You don't have permission to view this storage.");
    }
}


// Load Booked Cards for the Current User in reopen.html
function loadUserBookings() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const reopenContainer = document.getElementById('reopen-container');

    // Filter listings to show only those created by the current user
    const userBookings = listings.filter(listing => listing.userId === currentUsername);

    if (userBookings.length === 0) {
        reopenContainer.innerHTML = "<p>You have no bookings to reopen.</p>";
    } else {
        // Display user's created bookings with a clickable card to reopen
        reopenContainer.innerHTML = userBookings.map((listing, index) => `
            <div class="card ${listing.sold ? 'sold-card' : ''}" onclick="reopenStorage(${index})">
                <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
                <h3>${listing.type}</h3>
                <p>Location: ${listing.location}</p>
                <p>Cost per Day: $${listing.cost}</p>
            </div>
        `).join('');
    }
}

// Reopen Storage (Make it available again)
function reopenStorage(index) {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');

    // Ensure only the creator user can reopen it
    if (listings[index].userId === currentUsername) {
        listings[index].sold = false; // Mark as available
        delete listings[index].userId; // Remove booking user ID

        localStorage.setItem('listings', JSON.stringify(listings));
        alert('Storage space reopened successfully!');
        loadUserBookings(); // Reload the page to update the list
    } else {
        alert("You don't have permission to reopen this storage.");
    }
}

// Load Listings on listings.html
function loadListings() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const listingContainer = document.getElementById('listing-container');
    
    listingContainer.innerHTML = listings.map((listing, index) => `
        <div class="card ${listing.sold ? 'sold-card' : ''}" onclick="viewDetails(${index})">
            <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
            <h3>${listing.type}</h3>
            <p>Location: ${listing.location}</p>
            <p>Cost per Day: $${listing.cost}</p>
        </div>
    `).join('');
}

// View Details Function (for listings.html page)
function viewDetails(index) {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const listing = listings[index];
    
    // Allow access to details if storage is available or booked by any user
    localStorage.setItem('currentListing', index);
    window.location.href = 'details.html';
}

// Load Details Page Data on details.html
function loadDetails() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const index = localStorage.getItem('currentListing');
    const listing = listings[index];
    
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        <img src="${listing.image}" alt="Storage Image" style="width:300; max-height: 300px;">
        <h3>Type: ${listing.type}</h3>
        <p>Location: ${listing.location}</p>
        <p>Cost per Day: $${listing.cost}</p>
        <p>Area: ${listing.area} sq ft</p>
        <p>User ID: ${listing.userId || 'Available'}</p>
    `;

    // Show Book button if the listing is available
    const actionButtonContainer = document.getElementById('action-button');
    if (!listing.sold) {
        actionButtonContainer.innerHTML = `<button onclick="bookStorage()">Book</button>`;
    }
}

// Book Storage (in details.html)
function bookStorage() {
    const index = localStorage.getItem('currentListing');
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    listings[index].sold = true;
    listings[index].userId = currentUsername;  // Assign the booking to the current user
    localStorage.setItem('listings', JSON.stringify(listings));
    alert('Space booked successfully!');
    loadDetails();  // Reload details to show updated button
}


// Load Booked Cards for the Current User in reopen.html
function loadUserBookings() {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');
    const reopenContainer = document.getElementById('reopen-container');

    // Filter listings to show only those created by the current user
    const userBookings = listings.filter(listing => listing.userId === currentUsername);

    if (userBookings.length === 0) {
        reopenContainer.innerHTML = "<p>You have no bookings to reopen.</p>";
    } else {
        // Display user's created bookings with a Reopen button for sold cards
        reopenContainer.innerHTML = userBookings.map((listing) => `
            <div class="card ${listing.sold ? 'sold-card' : ''} ">
                <img src="${listing.image}" alt="Storage Image" style="width:100%; max-height: 150px;">
                <h3>${listing.type}</h3>
                <p>Location: ${listing.location}</p>
                <p>Cost per Day: $${listing.cost}</p>
                ${listing.sold ? `<button onclick="reopenStorage(${listing.id})">Reopen</button>` : ""}
            </div>
        `).join('');
    }
}

// Reopen Storage (Make it available again)
function reopenStorage(id) {
    const listings = JSON.parse(localStorage.getItem('listings') || '[]');

    const listingIndex = listings.findIndex(listing => listing.id === id);

    if (listingIndex !== -1 && listings[listingIndex].userId === currentUsername) {
        listings[listingIndex].sold = false; // Mark as available
        delete listings[listingIndex].userId; // Clear booking user ID

        localStorage.setItem('listings', JSON.stringify(listings));
        alert('Storage space reopened successfully!');
        loadUserBookings(); // Reload the page to update the list
    } else {
        alert("You don't have permission to reopen this storage.");
    }
}
// script.js

// Toggle menu visibility on smaller screens
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}
