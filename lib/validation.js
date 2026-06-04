// import { CATEGORIES, PRIORITIES, getPrioritySort } from "./notice";

// function isValidDateString(value) {
//   if (!value) return false;
//   const date = new Date(`${value}T12:00:00.000Z`);
//   return !Number.isNaN(date.getTime());
// }

// function cleanOptionalUrl(value) {
//   if (typeof value !== "string") return null;
//   const trimmed = value.trim();
//   return trimmed.length > 0 ? trimmed : null;
// }

// export function validateNoticePayload(payload) {
//   const errors = {};

//   const title = typeof payload.title === "string" ? payload.title.trim() : "";
//   const body = typeof payload.body === "string" ? payload.body.trim() : "";
//   const category = typeof payload.category === "string" ? payload.category.trim() : "";
//   const priority = typeof payload.priority === "string" ? payload.priority.trim() : "Normal";
//   const publishDate = typeof payload.publishDate === "string" ? payload.publishDate.trim() : "";
//   const imageUrl = cleanOptionalUrl(payload.imageUrl);

//   if (!title) {
//     errors.title = "Title is required.";
//   }

//   if (!body) {
//     errors.body = "Body is required.";
//   }

//   if (!CATEGORIES.includes(category)) {
//     errors.category = "Please choose a valid category.";
//   }

//   if (!PRIORITIES.includes(priority)) {
//     errors.priority = "Please choose a valid priority.";
//   }

//   if (publishDate && !isValidDateString(publishDate)) {
//     errors.publishDate = "Please choose a valid date.";
//   }

//   if (imageUrl) {
//     try {
//       new URL(imageUrl);
//     } catch {
//       errors.imageUrl = "Please enter a valid URL or leave this empty.";
//     }
//   }

//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors,
//     data: {
//       title,
//       body,
//       category,
//       priority,
//       prioritySort: getPrioritySort(priority),
//       publishDate: publishDate ? new Date(`${publishDate}T12:00:00.000Z`) : null,
//       imageUrl
//     }
//   };
// }

import { CATEGORIES, PRIORITIES, getPrioritySort } from "./notice";

function isValidDateString(value) {
  if (!value) return false;
  const date = new Date(`${value}T12:00:00.000Z`);
  return !Number.isNaN(date.getTime());
}

// This helper was missing – add it back
function cleanOptionalUrl(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function validateNoticePayload(payload) {
  const errors = {};

  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  const body = typeof payload.body === "string" ? payload.body.trim() : "";
  const category = typeof payload.category === "string" ? payload.category.trim() : "";
  const priority = typeof payload.priority === "string" ? payload.priority.trim() : "Normal";
  const publishDate = typeof payload.publishDate === "string" ? payload.publishDate.trim() : "";
  const imageUrl = cleanOptionalUrl(payload.imageUrl);

  if (!title) {
    errors.title = "Title is required.";
  }

  if (!body) {
    errors.body = "Body is required.";
  }

  // publishDate is optional, but validate if provided
  if (publishDate && !isValidDateString(publishDate)) {
    errors.publishDate = "Please choose a valid date.";
  }

  if (!CATEGORIES.includes(category)) {
    errors.category = "Please choose a valid category.";
  }

  if (!PRIORITIES.includes(priority)) {
    errors.priority = "Please choose a valid priority.";
  }

  if (imageUrl) {
    try {
      new URL(imageUrl);
    } catch {
      errors.imageUrl = "Please enter a valid URL or leave this empty.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: {
      title,
      body,
      category,
      priority,
      prioritySort: getPrioritySort(priority),
      publishDate: publishDate ? new Date(`${publishDate}T12:00:00.000Z`) : null,
      imageUrl
    }
  };
}