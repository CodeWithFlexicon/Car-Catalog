export async function getData(make, model) {
  // Replace spaces with hyphens to match slugs
  const makeSlug = make.toLowerCase().replace(/\s+/g, "-");
  const modelSlug = model.toLowerCase().replace(/\s+/g, "-");

  const apiUrl = `/api/cars/${makeSlug}/${modelSlug}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch car details:", error);
    return null;
  }
}
