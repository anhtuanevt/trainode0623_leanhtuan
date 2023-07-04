var browser = navigator.userAgent.toLowerCase();
var backgroundColor;

if (browser.includes('chrome')) {
  backgroundColor = 'red';
} else if (browser.includes('firefox')) {
  backgroundColor = 'blue';
} else if (browser.includes('safari')) {
  backgroundColor = 'green';
} else if (browser.includes('edge')) {
  backgroundColor = 'orange';
} else if (browser.includes('opera')) {
  backgroundColor = 'purple';
} else {
  backgroundColor = 'gray'; 
}

document.body.style.backgroundColor = backgroundColor;
