const movie = async () => {
    const response = await fetch('/api/users/movie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to grab movie');
    }
  };
  
  document.querySelector('#movie').addEventListener('click', movie);
  