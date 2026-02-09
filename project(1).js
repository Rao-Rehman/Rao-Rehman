//  JavaScript Enhancements 

  $(document).ready(function(){
    // Like button functionality
    let likeCount = 42;
    $("#likeBtn").click(function(){
      likeCount++;
      $("#likeCount").text(likeCount);
      $(this).addClass("btn-primary");
      setTimeout(() => {
        $(this).removeClass("btn-primary");
      }, 500);
    });
    
    // Status update animation
    $("#statusText").hover(function(){
      $(this).css("background-color", "#f8f9fa");
    }, function(){
      $(this).css("background-color", "transparent");
    });
    
    // Smooth scrolling for navigation
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top - 70
        }, 800, function(){
          window.location.hash = hash;
        });
      }
    });
    
    // Gallery image click effect
    $(".gallery img").click(function(){
      $(this).toggleClass("img-thumbnail");
    });
    
    // Add animation to navbar on scroll
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.navbar').addClass('navbar-scroll');
      } else {
        $('.navbar').removeClass('navbar-scroll');
      }
    });
    
    // Panel hover effect
    $(".panel").hover(function(){
      $(this).css("transform", "translateY(-5px)");
    }, function(){
      $(this).css("transform", "translateY(0)");
    });
  });



  
// Search functionality
$(document).ready(function(){
    // Existing code...
    
    // Search functionality
    const searchInput = $('.navbar-form .form-control');
    const searchResults = $('<div class="search-results"></div>').insertAfter('.navbar-form');
    
    // Sample data to search through (you can replace with your actual data)
    const searchData = [
        { title: "Rolls-Royce Phantom", category: "Cars", link: "#" },
        { title: "Lamborghini Aventador SVJ", category: "Cars", link: "#" },
        { title: "Mercedes-Maybach S-Class", category: "Cars", link: "#" },
        { title: "Ferrari SF90 Stradale", category: "Cars", link: "#" },
        { title: "Monaco Luxury Auto Show", category: "Events", link: "#events" },
        { title: "VIP Membership", category: "Services", link: "#" },
        { title: "2024 Luxury Car Preview", category: "Videos", link: "#" },
        { title: "Bentley Continental GT", category: "Cars", link: "#" },
        { title: "Aston Martin DB12", category: "Cars", link: "#" }
    ];

    searchInput.on('input', function() {
        const query = $(this).val().toLowerCase();
        searchResults.empty().hide();
        
        if (query.length > 0) {
            const results = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.category.toLowerCase().includes(query)
            );
            
            if (results.length > 0) {
                const resultsList = $('<ul class="list-group"></ul>');
                
                results.forEach(item => {
                    resultsList.append(`
                        <a href="${item.link}" class="list-group-item">
                            <strong>${item.title}</strong>
                            <span class="badge">${item.category}</span>
                        </a>
                    `);
                });
                
                searchResults.append(resultsList).show();
            } else {
                searchResults.append('<div class="no-results">No results found</div>').show();
            }
        }
    });
    
    // Hide results when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar-form').length) {
            searchResults.hide();
        }
    });
    
    // Handle form submission
    $('.navbar-form').on('submit', function(e) {
        e.preventDefault();
        const query = searchInput.val().trim();
        if (query) {
            alert(`Searching for: ${query}`);
            // Here you would typically redirect to a search results page
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
    });
});


// View Details functionality
$(document).on('click', '.btn-primary:contains("View Details")', function() {
    const carDiv = $(this).closest('.well');
    const carTitle = carDiv.find('h4').text();
    const carDescription = carDiv.find('p').first().text();
    
    // Get specifications
    const specs = [];
    carDiv.find('.row .col-sm-4 p').each(function() {
        specs.push($(this).text());
    });
    
    // Build modal content
    let modalContent = `
        <h3>${carTitle}</h3>
        <p>${carDescription}</p>
        <div class="highlight-box">
            <h4>Specifications</h4>
            <ul class="list-group">
    `;
    
    specs.forEach(spec => {
        modalContent += `<li class="list-group-item">${spec}</li>`;
    });
    
    modalContent += `
            </ul>
        </div>
        <div class="text-center" style="margin-top: 20px;">
            <img src="${carDiv.closest('.row').find('.img-circle').attr('src')}" 
                 class="img-responsive" 
                 style="max-height: 300px; margin: 0 auto;">
        </div>
    `;
    
    $('#carDetailsContent').html(modalContent);
    $('#carDetailsModal').modal('show');
});

// Test Drive functionality
$(document).on('click', '.btn-default:contains("Test Drive")', function() {
    const carTitle = $(this).closest('.well').find('h4').text();
    $('#carModel').val(carTitle);
    $('#testDriveModal').modal('show');
});

// Form submission
$('#submitTestDrive').click(function() {
    const formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        date: $('#date').val(),
        carModel: $('#carModel').val()
    };
    
    // Here you would typically send this data to your server
    console.log('Test Drive Request:', formData);
    
    // Show success message
    alert(`Thank you, ${formData.name}! Your test drive request for ${formData.carModel} has been received. We'll contact you shortly.`);
    
    // Reset form and close modal
    $('#testDriveForm')[0].reset();
    $('#testDriveModal').modal('hide');
});




$(document).ready(function(){
  // Interest tags functionality
  $('.interest-tag').click(function(){
    const interest = $(this).data('interest');
    let content = '';
    let modalTitle = '';
    
    switch(interest) {
      case 'cars':
        modalTitle = 'Automotive Excellence';
        content = `
          <h4>Luxury Car Technologies</h4>
          <div class="row">
            <div class="col-sm-6">
              <img src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" class="img-responsive">
            </div>
            <div class="col-sm-6">
              <ul>
                <li>Advanced Driver Assistance Systems</li>
                <li>Hybrid/Electric Powertrains</li>
                <li>Carbon Fiber Construction</li>
                <li>Augmented Reality Dashboards</li>
                <li>Autonomous Driving Features</li>
              </ul>
            </div>
          </div>
          <p class="text-muted">Click any car in our gallery to see detailed specifications</p>
        `;
        break;
        
      case 'travel':
        modalTitle = 'Luxury Travel';
        content = `
          <h4>Premium Travel Experiences</h4>
          <div class="row">
            <div class="col-sm-6">
              <img src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" class="img-responsive">
            </div>
            <div class="col-sm-6">
              <ul>
                <li>Private Jet Partnerships</li>
                <li>Luxury Yacht Charters</li>
                <li>Exotic Car Delivery Worldwide</li>
                <li>VIP Airport Services</li>
                <li>Custom Luxury Tours</li>
              </ul>
            </div>
          </div>
          <p>Our concierge can arrange any travel experience you desire</p>
        `;
        break;
        
      case 'technology':
        modalTitle = 'Automotive Tech';
        content = `
          <h4>Cutting-Edge Car Technologies</h4>
          <div class="row">
            <div class="col-sm-6">
              <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" class="img-responsive">
            </div>
            <div class="col-sm-6">
              <ul>
                <li>Night Vision Assist</li>
                <li>Laser Headlight Technology</li>
                <li>Active Aerodynamics</li>
                <li>48-Volt Electrical Systems</li>
                <li>Vehicle-to-Everything (V2X) Communication</li>
              </ul>
            </div>
          </div>
        `;
        break;
        
      case 'exclusive':
        modalTitle = 'Exclusive Access';
        content = `
          <h4>Members-Only Benefits</h4>
          <div class="row">
            <div class="col-sm-6">
              <img src="https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" class="img-responsive">
            </div>
            <div class="col-sm-6">
              <ul>
                <li>Private Viewing Events</li>
                <li>First Access to Limited Editions</li>
                <li>Factory Delivery Programs</li>
                <li>Celebrity Test Drive Events</li>
                <li>Custom Commissioning Services</li>
              </ul>
            </div>
          </div>
          <p>Available only to our VIP members</p>
        `;
        break;
        
      default:
        modalTitle = 'Latest Updates';
        content = `<p>Stay tuned for the latest luxury automotive news and updates.</p>`;
    }
    
    $('#interestModalLabel').text(modalTitle);
    $('#interestModalBody').html(content);
    $('#interestModal').modal('show');
  });

  // Search Luxury Items functionality
  $('#searchLuxuryBtn').click(function(e){
    e.preventDefault();
    window.location.href = "#cars"; // Scroll to cars section
  });

  // VIP Membership functionality
  $('[data-vip]').click(function(e){
    e.preventDefault();
    const type = $(this).data('vip');
    let content = '';
    
    if(type === 'private') {
      content = `
        <h4>Platinum VIP Tier</h4>
        <img src="https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" class="img-responsive" style="margin-bottom:15px;">
        <ul>
          <li>24/7 Dedicated Concierge</li>
          <li>Private Garage Facilities</li>
          <li>Worldwide Vehicle Shipping</li>
          <li>Exclusive Factory Tours</li>
          <li>Annual Luxury Retreat</li>
        </ul>
        <div class="text-center">
          <button class="btn btn-primary">Enquire Now</button>
        </div>
      `;
    } else if(type === 'public') {
      content = `
        <h4>Gold VIP Tier</h4>
        <img src="https://images.unsplash.com/photo-1533460004989-cef01064af7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" class="img-responsive" style="margin-bottom:15px;">
        <ul>
          <li>Priority Service Scheduling</li>
          <li>VIP Event Invitations</li>
          <li>Complimentary Maintenance</li>
          <li>Exclusive Test Drives</li>
          <li>Special Financing Rates</li>
        </ul>
        <div class="text-center">
          <button class="btn btn-primary">Join Today</button>
        </div>
      `;
    } else {
      content = `
        <h4>Tier Comparison</h4>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr class="active">
                <th>Benefit</th>
                <th>Gold</th>
                <th>Platinum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dedicated Concierge</td>
                <td><i class="fas fa-times text-danger"></i></td>
                <td><i class="fas fa-check text-success"></i></td>
              </tr>
              <tr>
                <td>Private Garage</td>
                <td><i class="fas fa-times text-danger"></i></td>
                <td><i class="fas fa-check text-success"></i></td>
              </tr>
              <tr>
                <td>VIP Events</td>
                <td><i class="fas fa-check text-success"></i></td>
                <td><i class="fas fa-check text-success"></i></td>
              </tr>
              <tr>
                <td>Annual Retreat</td>
                <td><i class="fas fa-times text-danger"></i></td>
                <td><i class="fas fa-check text-success"></i></td>
              </tr>
              <tr>
                <td>Membership Fee</td>
                <td>$5,000/year</td>
                <td>$25,000/year</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }
    
    $('#interestModalLabel').text('VIP Membership');
    $('#interestModalBody').html(content);
    $('#interestModal').modal('show');
  });
});




 let fontSize = 100;
  document.getElementById("accessibility-toggle").onclick = function () {
    document.getElementById("accessibility-widget").classList.toggle("show");
  };

  function changeFontSize(amount) {
    fontSize += amount * 10;
    document.body.style.fontSize = fontSize + "%";
  }

  function toggleClass(className) {
    document.body.classList.toggle(className);
  }

  function setLightBackground() {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
  }

  function underlineLinks() {
    document.querySelectorAll("a").forEach(link => {
      link.style.textDecoration = "underline";
    });
  }

  function setReadableFont() {
    document.body.style.fontFamily = "Arial, sans-serif";
  }

  function resetAccessibility() {
    fontSize = 100;
    document.body.style = "";
    document.body.classList.remove("grayscale", "high-contrast", "negative-contrast");
    document.querySelectorAll("a").forEach(link => {
      link.style.textDecoration = "";
    });
  }