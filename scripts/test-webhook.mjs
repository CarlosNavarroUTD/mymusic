const WEBHOOK_URL = "https://n8n.eabmodel.com/webhook/39660c1b-e56d-4256-871b-061ebafc3712";

async function testGet() {
  console.log("--- Testing GET ---");
  const res = await fetch(WEBHOOK_URL);
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Content-Type:", res.headers.get("content-type"));
  console.log("Body length:", text.length);
  console.log("Body (first 1000 chars):", text.slice(0, 1000));
  console.log("Body (last 200 chars):", text.slice(-200));

  try {
    const json = JSON.parse(text);
    console.log("\nParsed type:", typeof json, "isArray:", Array.isArray(json));
    if (Array.isArray(json)) {
      console.log("Array length:", json.length);
      console.log("First item:", JSON.stringify(json[0]));
      console.log("Second item:", JSON.stringify(json[1]));
    } else if (typeof json === "object") {
      console.log("Object keys:", Object.keys(json));
      for (const [k, v] of Object.entries(json)) {
        console.log(`  ${k}: type=${typeof v}, isArray=${Array.isArray(v)}, length=${Array.isArray(v) ? v.length : 'N/A'}`);
      }
    }
  } catch (e) {
    console.log("Not valid JSON:", e.message);
  }
}

async function testPost() {
  console.log("\n--- Testing POST ---");
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Body length:", text.length);
  console.log("Body (first 1000 chars):", text.slice(0, 1000));
  
  try {
    const json = JSON.parse(text);
    console.log("Parsed type:", typeof json, "isArray:", Array.isArray(json));
    if (Array.isArray(json)) {
      console.log("Array length:", json.length);
    }
  } catch (e) {
    console.log("Not valid JSON:", e.message);
  }
}

await testGet();
await testPost();
