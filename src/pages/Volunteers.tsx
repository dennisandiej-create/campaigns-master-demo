export default function Volunteers() {
  return (
    <div className="panel">
      <h2>Volunteer Centre</h2>

      <div className="stats">
        <div className="card">
          <h3>4,286</h3>
          <p>Total Volunteers</p>
        </div>

        <div className="card">
          <h3>3,981</h3>
          <p>Active</p>
        </div>

        <div className="card">
          <h3>184</h3>
          <p>Pending Approval</p>
        </div>

        <div className="card">
          <h3>126</h3>
          <p>Today's Tasks</p>
        </div>
      </div>

      <div className="panel">
        <h3>Volunteer Management</h3>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Ward</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>John Mwangi</td>
              <td>Matungulu</td>
              <td>0712345678</td>
              <td>Mobilizer</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}