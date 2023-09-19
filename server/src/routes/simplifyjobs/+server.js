export const GET = async ({ request, url }) => {
	const parseMarkdownTable = (markdownText) => {
		const lines = markdownText.trim().split('\n');
		const data = [];
		let isDataSection = false;

		for (const line of lines) {
			if (line.includes('| --- |')) {
				isDataSection = true;
				continue;
			}

			if (isDataSection && line.includes('|')) {
				const values = line
					.split('|')
					.map((item) => item.trim())
					.filter((item) => item !== '');

				if (values.length >= 5) {
					let locations = values[2].trim().split('</br>');
					locations = locations.map((location) =>
						location.replace(/<details><summary>|<\/summary>/g, '')
					);

					let link = values[3].trim().split('href="')[1];

					if (link) {
						link = link.replace(/<a [^>]*><img [^>]*>/g, '');
					}

					const companyMatch = values[0].match(/\[(.*?)\]/);
					const companyName = companyMatch ? companyMatch[1] : values[0];
					const rowData = {
						Company: companyName,
						Role: values[1].trim(),
						Location: locations,
						ApplicationLink: link || '',
						DatePosted: values[4].trim()
					};
					data.push(rowData);
				}
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
		const data = parseMarkdownTable(markdownText);

		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
