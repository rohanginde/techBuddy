


import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
function LineCustomChart({data ,title, labels}) {
  
    return (  <div className="section col-md-6">
    <h3 className="section-title">{title}</h3>
    <div className="section-content">
      <ResponsiveContainer width="100%" height={300}>
        
        <LineChart data={data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
          <Tooltip />
          <XAxis dataKey="label" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend/>
          <Line type="monotone" dataKey={labels[0]}stroke="#FB8833" />
          <Line type="monotone" dataKey={labels[1]} stroke="#17A8F5" />
          <Line type="monotone" dataKey={labels[2]} stroke="#17A222" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div> );
}

export default LineCustomChart;