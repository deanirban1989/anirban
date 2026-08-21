module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  var body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      res.status(400).json({ error: "Invalid JSON body" });
      return;
    }
  }
  var password = body && body.password;
  var content = body && body.content;

  if (!process.env.ADMIN_SECRET) {
    res.status(500).json({ error: "Server missing ADMIN_SECRET configuration" });
    return;
  }
  if (!password || password !== process.env.ADMIN_SECRET) {
    res.status(401).json({ error: "Incorrect password" });
    return;
  }
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    res.status(400).json({ error: "Missing or invalid content payload" });
    return;
  }

  var requiredKeys = ["name", "role", "experience", "achievements", "skills"];
  for (var i = 0; i < requiredKeys.length; i++) {
    if (!(requiredKeys[i] in content)) {
      res.status(400).json({ error: "Content payload missing field: " + requiredKeys[i] });
      return;
    }
  }

  var token = process.env.GITHUB_TOKEN;
  if (!token) {
    res.status(500).json({ error: "Server missing GITHUB_TOKEN configuration" });
    return;
  }

  var owner = process.env.GITHUB_OWNER || "deanirban1989";
  var repo = process.env.GITHUB_REPO || "anirban";
  var branch = process.env.GITHUB_BRANCH || "claude/personal-portfolio-site-0nac31";
  var path = "content.json";
  var apiBase = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + path;

  try {
    var getResp = await fetch(apiBase + "?ref=" + encodeURIComponent(branch), {
      headers: {
        Authorization: "Bearer " + token,
        "User-Agent": "anirban-portfolio-admin",
        Accept: "application/vnd.github+json"
      }
    });
    if (!getResp.ok) {
      var getErr = await getResp.text();
      throw new Error("Failed to read current file (" + getResp.status + "): " + getErr);
    }
    var fileData = await getResp.json();
    var sha = fileData.sha;

    var newContentString = JSON.stringify(content, null, 2) + "\n";
    var newContentBase64 = Buffer.from(newContentString, "utf-8").toString("base64");

    var putResp = await fetch(apiBase, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "User-Agent": "anirban-portfolio-admin",
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json"
      },
      body: JSON.stringify({
        message: "Update site content via admin panel",
        content: newContentBase64,
        sha: sha,
        branch: branch
      })
    });

    if (!putResp.ok) {
      var putErr = await putResp.text();
      throw new Error("GitHub commit failed (" + putResp.status + "): " + putErr);
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: String((err && err.message) || err) });
  }
};
