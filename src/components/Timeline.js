import React, { useEffect, useState, useRef } from "react";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import EventService from "./EventService";

const TimelineComponent = () => {
  const timelineRef = useRef(null); // Reference to the Vis.js timeline container
  const [events, setEvents] = useState([]); // State to store events

  // Fetch events from the API on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventService.getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Initialize the Vis.js timeline when events change
  useEffect(() => {
    if (events.length > 0 && timelineRef.current) {
      const timelineItems = events.map(event => ({
        id: event.id,
        content: event.comments || "No comment",
        start: event.start_date,
        end: event.end_date,
        group: event.category_id,
      }));

      const options = {
        width: "100%",
        height: "400px",
        stack: true,
        margin: { item: 10 },
        editable: false,
        selectable: true,
      };

      new Timeline(timelineRef.current, timelineItems, options);
    }
  }, [events]);

  return (
    <div>
      <h1>Timeline</h1>
      <div ref={timelineRef}></div>
    </div>
  );
};

export default TimelineComponent;
