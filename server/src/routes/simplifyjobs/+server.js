export const GET = async ({ request, url }) => {
	const mdParser = (markdownText) => {
		const tableRegex = /\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|/g;
		const headerRegex = /\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|/;

		const lines = markdownText.split('\n');
		const data = [];
		let isHeaderRow = true; // Flag to identify header row

		for (const line of lines) {
			if (isHeaderRow) {
				// Check if this is the header row
				if (headerRegex.test(line)) {
					isHeaderRow = false; // Skip the header row
					continue;
				}
			}

			// Ensure that the line matches a valid data row
			if (tableRegex.test(line) && !line.includes('---')) {
				const row = line.match(tableRegex)[0];
				if (row) {
					const rowData = {
						Company: row.split('|')[1].replaceAll('*','').replaceAll('[','').replaceAll(']','').split('(')[0],
						Role: row.split('|')[2],
						Location: row.split('|')[3],
						'Application/Link': row.split('|')[4],
						'Date Posted': row.split('|')[5],
					};
					data.push(rowData);
				}
			}
		}

		return data;
	};

	const res = await fetch(
		`https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/README.md`
	);
	const data = await res.text();

	return new Response(JSON.stringify(mdParser(data)), { status: 200 });
};
