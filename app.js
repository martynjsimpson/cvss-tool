function generateUrls() {
    const input = document.getElementById('cveInput').value.trim();
    const errorElement = document.getElementById('error');
    const resultElement = document.getElementById('result');

    // Clear previous messages
    errorElement.textContent = '';
    resultElement.innerHTML = '';

    // Adjust input if it starts without "CVE-"
    const cvePatternWithPrefix = /^CVE-\d{4}-\d{4,7}$/i;
    const cvePatternWithoutPrefix = /^\d{4}-\d{4,7}$/;

    let formattedInput;
    if (cvePatternWithPrefix.test(input)) {
        formattedInput = input; // Already valid
    } else if (cvePatternWithoutPrefix.test(input)) {
        formattedInput = `CVE-${input}`; // Add "CVE-" prefix
    } else {
        errorElement.textContent = 'Invalid CVE format. Use CVE-xxxx-xxxx or xxxx-xxxx.';
        return;
    }

    // Generate URLs for different providers (removed Qualys)
    const urls = [
        { 
            provider: 'NVD', 
            logo: 'images/logos/nvd-logo.png', 
            url: `https://nvd.nist.gov/vuln/detail/${formattedInput}` 
        },
        { 
            provider: 'Red Hat', 
            logo: 'images/logos/redhat-logo.png', 
            url: `https://access.redhat.com/security/cve/${formattedInput}` 
        },
        { 
            provider: 'MITRE', 
            logo: 'images/logos/mitre-logo.png', 
            url: `https://cve.mitre.org/cgi-bin/cvename.cgi?name=${formattedInput}` 
        },
        { 
            provider: 'VulDB', 
            logo: 'images/logos/vuldb-logo.png', 
            url: `https://vuldb.com/?id=${formattedInput}` 
        },
        { 
            provider: 'Exploit-DB', 
            logo: 'images/logos/exploitdb-logo.png', 
            url: `https://www.exploit-db.com/exploits/${formattedInput}` 
        },
        { 
            provider: 'Snyk', 
            logo: 'images/logos/snyk-logo.png', 
            url: `https://snyk.io/vuln/${formattedInput}` 
        },
    ];

    // Display the result
    resultElement.innerHTML = `
        <p><strong>Links for ${formattedInput}:</strong></p>
        <table>
            <thead>
                <tr>
                    <th>Provider</th>
                    <th>Logo</th>
                    <th>URL</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${urls.map(url => `
                    <tr>
                        <td>${url.provider}</td>
                        <td><img src="${url.logo}" alt="${url.provider} logo" width="50"></td>
                        <td><a href="${url.url}" target="_blank">${url.url}</a></td>
                        <td>
                            <button onclick="copyToClipboard('${url.url}')">Copy</button>
                            <button onclick="openInNewWindow('${url.url}')">Open</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function openInNewWindow(url) {
    window.open(url, '_blank');
}
