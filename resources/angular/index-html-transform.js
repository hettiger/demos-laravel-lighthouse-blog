module.exports = (targetOptions, indexHtml) => {
  if (targetOptions.target === 'serve') {
    return indexHtml;
  }

  return indexHtml
    .replace(/(favicon\.ico)/, '{{ asset(\'angular/$1\') }}')
    .replace(/(styles\.css)/, '{{ asset(\'angular/$1\') }}')
    .replaceAll(/src="([^"]+)"/g, `src="{{ asset('angular/$1') }}"`);
};
