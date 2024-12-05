import React, { useEffect, useState, useRef } from "react";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import EventService from "./EventService";
import CategoryService from "./CategoryService";

const TimelineComponent = () => {
  const timelineRef = useRef(null); // Reference to the container for the Vis.js timeline
  const timelineInstanceRef = useRef(null); // Reference to the Vis.js timeline instance
  const [events, setEvents] = useState([]); // State to store events
  const [filteredEvents, setFilteredEvents] = useState([]); // Events to display
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category ID
  const [categories, setCategories] = useState([]);

  function eventColor(categoryId) {
    if (categoryId === 2) {
      return 'red';
    }
    if (categoryId === 3) {
      return 'yellow';
    }
    return '';
  }

  // Fetch events from the API on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventService.getEvents();
        setEvents(data);
        setFilteredEvents(data); // Initially, display all events
      } catch (error) {
        console.error("Error loading events:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    fetchEvents();
    fetchCategories();
  }, []);

  // Initialize or update the Vis.js timeline when events change
  useEffect(() => {
    const visEvents = (rorEvents) => {
      return rorEvents.map(event => ({
        id: event.id,
        content: event.comments || "No comment",
        start: event.start_date,
        end: event.end_date,
        group: event.category_id,
        title: `Fecha: ${event.start_date}`,
        className: eventColor(event.category_id)
      }));
    }
    if (timelineRef.current) {
      // Prepare timeline items
      const timelineItems = visEvents(events);

      const options = {
        width: "100%",
        height: "400px",
        stack: true,
        margin: { item: 10 },
        editable: false,
        selectable: true,
      };

      // If a timeline instance already exists, update its items
      if (timelineInstanceRef.current) {
        timelineInstanceRef.current.setItems(timelineItems);
      } else {
        // Create a new timeline instance
        timelineInstanceRef.current = new Timeline(timelineRef.current, timelineItems, options);
      }
    }

    // Cleanup on component unmount
    return () => {
      if (timelineInstanceRef.current) {
        timelineInstanceRef.current.destroy();
        timelineInstanceRef.current = null;
      }
    };
  }, [events, filteredEvents]);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);

    if (categoryId === null) {
      setFilteredEvents(events); // Show all events if no category is selected
    } else {
      setFilteredEvents(events.filter(event => toString(event.category_id) === categoryId));
    }
    // TODO: redraw timeline with filtered events
  };

  return (
    <div>
      <h1>Línea de vida</h1>

      {/* Radio buttons for filtering by category */}
      <div>
        <label>
          <input
            type="radio"
            name="category"
            value="all"
            checked={selectedCategory === null}
            onChange={() => handleCategoryChange(null)}
          />
          Todo
        </label>
        {categories.map(category => (
          <label key={category.id}>
            <input
              type="radio"
              name="category"
              value={category.id}
              checked={selectedCategory === category.id}
              onChange={() => handleCategoryChange(category.id)}
            />
            {category.title}
          </label>
        ))}
      </div>

      <div ref={timelineRef}></div>
    </div>
  );
};

export default TimelineComponent;
