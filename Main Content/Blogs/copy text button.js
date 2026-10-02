document.querySelectorAll('.linux-copy-command').forEach(block => {
    // Grab the command text, then strip the leading "$ " so it pastes cleanly
    const command = block.textContent.trim().replace(/^\$\s*/, '');

    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.type = 'button';
    button.textContent = 'Copy';

    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(command);
        } catch (err) {
            // Fallback for browsers/contexts where the Clipboard API isn't available
            const temp = document.createElement('textarea');
            temp.value = command;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            temp.remove();
        }

        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
        }, 1500);
    });

    block.appendChild(button);
});