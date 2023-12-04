const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF-B-JAY/events`;

const state = {
  events: [],
};

const eventList = document.querySelector("#events");

const deleteEventButton = document.querySelector("button");
deleteEventButton.addEventListener("click", deleteEvent);

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getEvents();
  renderEvents();
}
render();

/**
 * Update state with artists from API
 */
async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.events = json.data;
  } catch (error) {
    console.error(error);
  }
}

function renderEvents(){
    if (!state.events.length) {
        eventList.innerHTML = "<li>No events.</li>";
        return;
      }

    const eventItems = state.events.map (event => {
        const li = document.createElement("li");
        li.innerHTML = `
        <button>Delete</button>
        <h2>${event.name}</h2>
        <li> Date: ${event.date}</li>
        <li> Location: ${event.location}</li>
        <p>${event.description}</p>
        `
        return li;
    }
    
    )
    eventList.replaceChildren(...eventItems);

}

async function deleteEvent(event) {
    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        })
      
  
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

    } catch (error) {
      console.error(error);
    }
  }

async function addEvent(event) {
    event.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: addEventForm.name.value,
          date: addEventForm.date.value,
          location: addEventForm.location.value,
          description: addEventForm.description.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create artist");
      }

      render();
    } catch (error) {
      console.error(error);
    }
}