export const skillCategories = [
    { id: 'all', name: 'All Skills' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Database' },
    { id: 'networking', name: 'Networking' },
    { id: 'iot', name: 'IoT' },
    { id: 'research', name: 'Research & Tools' },
  ];
  
  export const skillsData = [
    // Frontend
    { name: 'HTML/CSS', value: 90, category: 'frontend' },
    { name: 'JavaScript', value: 85, category: 'frontend' },
    { name: 'React.js', value: 80, category: 'frontend' },
    { name: 'Vue.js', value: 75, category: 'frontend' },
    { name: 'Tailwind CSS', value: 85, category: 'frontend' },
    { name: 'Bootstrap', value: 90, category: 'frontend' },
    { name: 'Next.js', value: 70, category: 'frontend' },
    { name: 'Three.js', value: 65, category: 'frontend' },
    
    // Backend
    { name: 'Node.js', value: 75, category: 'backend' },
    { name: 'Express.js', value: 80, category: 'backend' },
    { name: 'PHP', value: 85, category: 'backend' },
    { name: 'Laravel', value: 80, category: 'backend' },
    { name: 'Django', value: 65, category: 'backend' },
    { name: 'Python', value: 70, category: 'backend' },
    { name: 'Java', value: 60, category: 'backend' },
    { name: 'REST API', value: 85, category: 'backend' },
    
    // Database
    { name: 'MySQL', value: 85, category: 'database' },
    { name: 'PostgreSQL', value: 75, category: 'database' },
    { name: 'MongoDB', value: 70, category: 'database' },
    { name: 'Redis', value: 60, category: 'database' },
    { name: 'Firebase', value: 75, category: 'database' },
    
    // Networking
    { name: 'TCP/IP', value: 80, category: 'networking' },
    { name: 'VANET', value: 75, category: 'networking' },
    { name: 'WSN', value: 85, category: 'networking' },
    { name: 'Network Security', value: 70, category: 'networking' },
    { name: 'MQTT', value: 80, category: 'networking' },
    { name: 'Socket Programming', value: 75, category: 'networking' },
    
    // IoT
    { name: 'Arduino', value: 85, category: 'iot' },
    { name: 'ESP32/ESP8266', value: 80, category: 'iot' },
    { name: 'Sensors Integration', value: 85, category: 'iot' },
    { name: 'IoT Protocols', value: 80, category: 'iot' },
    { name: 'IoT Architecture', value: 75, category: 'iot' },
    { name: 'Embedded Systems', value: 70, category: 'iot' },
    
    // Research & Tools
    { name: 'Git', value: 85, category: 'research' },
    { name: 'Docker', value: 70, category: 'research' },
    { name: 'AWS', value: 60, category: 'research' },
    { name: 'Agile/Scrum', value: 80, category: 'research' },
    { name: 'UI/UX Design', value: 75, category: 'research' },
    { name: 'Figma', value: 75, category: 'research' },
    { name: 'Linux', value: 70, category: 'research' },
    { name: 'Academic Writing', value: 80, category: 'research' },
    { name: 'Data Analysis', value: 75, category: 'research' },
    { name: 'Research Methodology', value: 85, category: 'research' },
  ];
  
  export const radarChartData = {
    labels: ['Frontend', 'Backend', 'Database', 'Networking', 'IoT', 'Research'],
    datasets: [
      {
        label: 'Skill Level',
        data: [82, 75, 73, 78, 79, 75],
        backgroundColor: 'rgba(123, 104, 238, 0.2)',
        borderColor: 'rgba(123, 104, 238, 1)',
        pointBackgroundColor: 'rgba(123, 104, 238, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(123, 104, 238, 1)',
      },
    ],
  };
  
  // Function to calculate average skill values by category (for reference)
  const calculateAverages = () => {
    const categories = [...new Set(skillsData.map(skill => skill.category))];
    const averages = {};
    
    categories.forEach(category => {
      const skills = skillsData.filter(skill => skill.category === category);
      const sum = skills.reduce((total, skill) => total + skill.value, 0);
      averages[category] = Math.round(sum / skills.length);
    });
    
    return averages;
  };