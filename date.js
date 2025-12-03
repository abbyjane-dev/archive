// Get the last modified timestamp from the browser / server
const lastModifiedRaw = document.lastModified;
const lastModifiedDate = new Date(lastModifiedRaw);

// Fallback: if parsing fails, bail out quietly
if (!isNaN(lastModifiedDate.getTime())) {
  // Add ordinal suffix (st, nd, rd, th)
  function ordinal(n) {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  // Format base date
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formatted = lastModifiedDate.toLocaleDateString("en-GB", options);

  const day = lastModifiedDate.getDate();
  const withOrdinal = day + ordinal(day);

  // Replace bare day number with "3rd", "21st", etc.
  const final = formatted.replace(day, withOrdinal);

  // Inject into the page
  const target = document.getElementById("last-updated");
  if (target) {
    target.textContent = final;
  }
}
