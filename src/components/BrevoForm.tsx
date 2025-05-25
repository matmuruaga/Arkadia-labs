const BrevoForm = () => {
  return (
    <div className="w-full flex justify-center">
      <iframe
        width="100%"
        height="600" // Ajustado para evitar scroll
        src="https://sibforms.com/serve/MUIFAGN6ccfa_dIe4yux8e553LoKsjsODN8P1YCqoBwRFXv9LueT_UaKeo1TNrDTwKKrTpmcI8giyZuapWSjJtQzDAOe0U-84O3TeSswNNvtqyOAHM8zAut7DGYYQ_7AJpizAjdEExQ5hAcEgEPBfjR_3HLcJt5mdqZC70btfHrBNhNT-dedStIZwVn5KiQBsvbGcSuZcQBBzHXU"
        scrolling="no"
        allowFullScreen
        style={{
          border: 'none',
          overflow: 'hidden',
          maxWidth: '100%',
        }}
        title="Formulario Brevo"
      />
    </div>
  );
};

export default BrevoForm;
