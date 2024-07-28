document.addEventListener('DOMContentLoaded', () => {
  const dataUrl = 'data.json';
  let data = [];

  // Fetch data from JSON file
  fetch(dataUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(jsonData => {
      data = jsonData;
      updateDOM(data, 'daily'); // Default to daily
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error));

  // Function to update the DOM
  function updateDOM(data, timeframe) {
    data.forEach(activity => {
      // Normalize the activity title to match class names
      const normalizedTitle = activity.title.toLowerCase().replace(/\s+/g, '-');
      const activityElement = document.querySelector(`.dash_activities-${normalizedTitle}`);
      if (activityElement) {
        const current = activity.timeframes[timeframe].current;
        const previous = activity.timeframes[timeframe].previous;
        activityElement.querySelector('.dash_activities-foreground').innerHTML = `
          <div class="dash_activities-${normalizedTitle}-subhead">
            <h3>${activity.title}</h3>
            <img src="images/icon-ellipsis.svg" alt="ellipsis icon">
          </div>
          <div class="dash_activities-info">
            <p class="current">${current}hrs</p>
            <p class="previous">Last Week - ${previous}hrs</p>
          </div>
        `;
      }
    });
  }

  // Event listeners for buttons
  document.querySelectorAll('.dash_bio-profile-button').forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const timeframe = event.target.textContent.toLowerCase();
      updateDOM(data, timeframe);
    });
  });
});