import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Clock
} from "lucide-react";

interface EventType {
  title: string;
  date: string;
  time: string;
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getLocalDateString = (date: Date) =>
  date.toLocaleDateString("en-CA");

const CalendarPage = () => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    getLocalDateString(today)
  );

  // ✅ LOAD FROM LOCAL STORAGE
  const [events, setEvents] = useState<EventType[]>(() => {
    const saved = localStorage.getItem("calendar-events");
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);

  // ✅ SAVE TO LOCAL STORAGE WHEN EVENTS CHANGE
  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events));
  }, [events]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const formatDate = (day: number) =>
    getLocalDateString(new Date(year, month, day));

  const changeMonth = (direction: number) =>
    setCurrentDate(new Date(year, month + direction, 1));

  const handleAddEvent = (title: string, time: string) => {
    if (!title || !time) return;

    setEvents([
      ...events,
      { title, date: selectedDate, time }
    ]);

    setShowModal(false);
  };

  const eventsForSelectedDate = events.filter(
    (e) => e.date === selectedDate
  );

  return (
    <div className="p-6 lg:p-10 space-y-10 h-full overflow-y-auto">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold gradient-cyan-lavender mb-1">
          Calendar
        </h1>
        <p className="text-sm text-caption">
          Plan your wellness activities and therapy sessions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* MAIN CALENDAR */}
        <div className="lg:col-span-3 glass rounded-3xl p-10">

          {/* Month Header */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-semibold text-heading">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <div className="flex gap-3">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => changeMonth(1)}
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* WEEKDAY HEADER */}
          <div className="grid grid-cols-7 gap-4 mb-6 text-xs text-caption">
            {days.map((d) => (
              <div key={d} className="text-center font-medium">
                {d}
              </div>
            ))}
          </div>

          {/* DATE GRID */}
          <div className="grid grid-cols-7 gap-4">

            {/* Empty offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: totalDays }, (_, i) => {
              const day = i + 1;
              const fullDate = formatDate(day);
              const isToday =
                fullDate === getLocalDateString(today);
              const isSelected =
                fullDate === selectedDate;
              const dayEvents = events.filter(
                (e) => e.date === fullDate
              );

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(fullDate)}
                  className={`
                    min-h-[110px] rounded-2xl p-3 cursor-pointer
                    transition-all duration-200 border
                    ${
                      isSelected
                        ? "bg-primary/10 border-primary"
                        : isToday
                        ? "bg-muted border-border"
                        : "border-border hover:bg-muted"
                    }
                  `}
                >
                  <div className="text-sm font-semibold text-heading mb-2">
                    {day}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event, idx) => (
                      <div
                        key={idx}
                        className="text-[11px] px-2 py-1 rounded-md bg-primary/10 text-primary truncate"
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="glass rounded-3xl p-8 flex flex-col">

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-heading">
              {new Date(selectedDate).toDateString()}
            </h3>
            <p className="text-xs text-caption mt-1">
              Scheduled events
            </p>
          </div>

          <div className="flex-1 space-y-4">
            {eventsForSelectedDate.length === 0 ? (
              <div className="bg-muted rounded-2xl p-6 text-center">
                <p className="text-sm text-caption">
                  No events for this day.
                </p>
              </div>
            ) : (
              eventsForSelectedDate.map((event, i) => (
                <div
                  key={i}
                  className="bg-muted rounded-2xl p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-heading">
                      {event.title}
                    </p>
                    <p className="text-xs text-caption flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-primary text-primary-foreground py-3 rounded-2xl font-medium hover:opacity-90 transition"
          >
            + Add Event
          </button>
        </div>
      </div>

      {showModal && (
        <EventModal
          onClose={() => setShowModal(false)}
          onSave={handleAddEvent}
        />
      )}
    </div>
  );
};

const EventModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (title: string, time: string) => void;
}) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="glass rounded-3xl p-10 w-[420px] space-y-6 shadow-2xl">

        <div className="flex justify-between items-center border-b border-border pb-4">
          <h3 className="text-xl font-semibold text-heading">
            Create New Event
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-caption" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-xs text-caption mb-2 block">
              Event Title
            </label>
            <input
              placeholder="e.g. Therapy Session"
              className="w-full p-4 rounded-xl bg-muted outline-none focus:ring-2 focus:ring-primary transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-caption mb-2 block">
              Time
            </label>
            <input
              type="time"
              className="w-full p-4 rounded-xl bg-muted outline-none focus:ring-2 focus:ring-primary transition"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={() => onSave(title, time)}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-medium hover:opacity-90 transition"
        >
          Save Event
        </button>
      </div>
    </div>
  );
};

export default CalendarPage;