export const GET = async ({ request, url }) => {
	const parseMarkdownTable = async (markdownText) => {
		const headerSplitter =
			'<!-- Please leave a one line gap between this and the table TABLE_START (DO NOT CHANGE THIS LINE) -->';
		const footerSplitter =
			'<!-- Please leave a one line gap between this and the table TABLE_END (DO NOT CHANGE THIS LINE) -->';

		const lines = markdownText.trim().split('\n');
		const data = [];

		const headerIndex = lines.indexOf(headerSplitter);
		lines.splice(0, headerIndex + 4);

		const footerIndex = lines.indexOf(footerSplitter);
		lines.splice(footerIndex, lines.length - 1);

		for (let i = lines.indexOf(headerSplitter) + 1; i < footerIndex; i++) {
			let line = lines[i].trim();
			if (line.startsWith('|')) {
				line = line.substring(1);
			}
			if (line.endsWith('|')) {
				line = line.slice(0, -1);
			}
			const values = line.split('|').map((value) => value.trim());

			let company = values[0];
			if (company.startsWith('**[') && company.endsWith(')**')) {
				const linkMatches = company.match(/\*\*\[(.*?)\]\((.*?)\)\*\*/);
				if (linkMatches && linkMatches.length === 3) {
					company = linkMatches[1];
				}
			}

			let location = values[2] ? values[2].trim() : '';

			if (/<details><summary>.*<\/summary>(.*)<\/details>/.test(location)) {
				const matches = location.match(/<details><summary>.*<\/summary>(.*)<\/details>/);
				if (matches && matches[1]) {
					location = matches[1].split(/<\/br>|\n/).map((loc) => loc.trim());
				}
			} else if (location.includes(';')) {
				location = location.split(';').map((loc) => loc.trim());
			} else if (location.includes('</br>')) {
				location = location.split('</br>').map((loc) => loc.trim());
			} else if (/,\s[A-Z]{2}\sRemote/.test(location)) {
				location = location
					.replace(/,\s[A-Z]{2}\s/, ', ')
					.split(', ')
					.map((loc) => loc.trim());
			} else {
				location = location ? [location] : [];
			}

			let applicationLink;
			if (values[3] !== '🔒') {
				applicationLink = values[3]
					?.split('</a>')
					.filter((element) => /alt="Apply"/.test(element))[0]
					?.split('href=')[1]
					?.split('"')[1];
			} else {
				applicationLink = null;
			}

			if (company && company.trim()) {
				data.push({
					company: company,
					role: values[1],
					jobLocation: location,
					applicationLink,
					datePosted: values[4]
				});
			}
		}

		return data;
	};

	try {
		const res = await fetch(
			'https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/README.md'
		);

		if (!res.ok) {
			throw new Error('Failed to fetch data.');
		}

		const markdownText = await res.text();
		const data = await parseMarkdownTable(markdownText);
		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
