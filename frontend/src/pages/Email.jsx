const Email = () => {
  return (
    <div>
      <form id="emailForm">
        <input type="email" name="to" placeholder="Recipient Email" required />
        <input
          type="text"
          name="subject"
          placeholder="Email Subject"
          required
        />
        <textarea name="text" placeholder="Email Content" required></textarea>
        <button type="submit">Send Email</button>
      </form>

    </div>
  );
};
export default Email;
