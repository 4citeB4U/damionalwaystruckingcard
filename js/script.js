// Business Card Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const saveContactBtn = document.getElementById('save-contact');
  const showAgentBtn = document.getElementById('show-agent');
  const agentWrapper = document.getElementById('agent-wrapper');
  const closeAgentBtn = document.getElementById('close-agent');
  const faqQuestions = document.querySelectorAll('.faq-question');
  const agentNavBtns = document.querySelectorAll('.agent-nav-btn');
  const businessCard = document.querySelector('.business-card');
  
  // Make sure the business card covers the full screen
  function adjustCardForFullScreen() {
    // Set width and height to cover full viewport
    businessCard.style.width = '100vw';
    businessCard.style.height = '100vh';
    
    // Add slight vertical stretch to enhance card effect
    businessCard.style.transform = 'scaleY(1.02)';
    
    // Ensure content is fully visible
    const windowWidth = window.innerWidth;
    
    // On narrower screens, adjust background position to show all content
    if (windowWidth < 500) {
      businessCard.style.backgroundSize = 'contain';
      businessCard.style.backgroundPosition = 'center center';
      businessCard.style.backgroundRepeat = 'no-repeat';
    } else {
      businessCard.style.backgroundSize = 'cover';
      businessCard.style.backgroundPosition = 'center center';
    }
  }
  
  // Run on load and resize
  adjustCardForFullScreen();
  window.addEventListener('resize', adjustCardForFullScreen);
  
  // Save Contact functionality
  saveContactBtn.addEventListener('click', function() {
    const contact = {
      name: "Damien",
      phoneNumbers: [
        { type: "work", number: "1-800-362-6564" },
        { type: "mobile", number: "414-316-0702" }
      ],
      email: "Damien@alwaystruckingandloading.com"
    };
    
    // Create vCard format
    const vcard = createVCard(contact);
    
    // Create download
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = "damien_contact.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  
  // Show Agent Lee functionality
  showAgentBtn.addEventListener('click', function() {
    agentWrapper.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
  });
  
  // Close Agent Lee when clicking the close button
  closeAgentBtn.addEventListener('click', function() {
    agentWrapper.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  });
  
  // Toggle FAQ answers when clicking on questions
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      // Toggle active class on the question
      this.classList.toggle('active');
      
      // Get the answer element (next sibling)
      const answer = this.nextElementSibling;
      
      // Toggle show class on the answer
      answer.classList.toggle('show');
    });
  });
  
  // Agent navigation buttons
  agentNavBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const section = this.getAttribute('data-section');
      
      // Find all FAQ items related to this section
      let sectionFAQs = [];
      
      switch(section) {
        case 'services':
          sectionFAQs = ['What services does Always Trucking and Loading offer?', 
                         'Do you handle time-sensitive deliveries?',
                         'What makes Always Trucking and Loading different from competitors?'];
          break;
        case 'locations':
          sectionFAQs = ['What areas do you serve?'];
          break;
        case 'fleet':
          sectionFAQs = ['What types of trucks are in your fleet?',
                         'How do you handle specialized or oversized cargo?'];
          break;
        case 'contact':
          sectionFAQs = ['How can I get a quote for transportation services?',
                         'Are you licensed and insured?'];
          break;
      }
      
      // Highlight matching FAQs
      faqQuestions.forEach(question => {
        const questionText = question.textContent;
        const answer = question.nextElementSibling;
        
        if (sectionFAQs.some(faq => questionText.includes(faq))) {
          // Open and highlight these FAQs
          question.classList.add('active');
          answer.classList.add('show');
          
          // Scroll to first matching FAQ
          if (questionText.includes(sectionFAQs[0])) {
            question.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          // Close other FAQs
          question.classList.remove('active');
          answer.classList.remove('show');
        }
      });
    });
  });
  
  // Make sure the agent wrapper starts hidden
  agentWrapper.style.display = 'none';
});

// Function to create vCard format
function createVCard(contact) {
  let vcard = "BEGIN:VCARD\n";
  vcard += "VERSION:3.0\n";
  vcard += `FN:${contact.name}\n`;
  vcard += `N:${contact.name};;;\n`;
  
  contact.phoneNumbers.forEach(phone => {
    vcard += `TEL;TYPE=${phone.type.toUpperCase()}:${phone.number}\n`;
  });
  
  vcard += `EMAIL:${contact.email}\n`;
  vcard += `URL:https://alwaystruckingandloading.com\n`;
  vcard += `ORG:Always Trucking and Loading LLC\n`;
  vcard += "END:VCARD";
  
  return vcard;
}