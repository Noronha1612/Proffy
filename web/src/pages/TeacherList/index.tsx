import React, { useState, FormEvent } from 'react';

import './styles.css';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';


import api from '../../services/api';

interface ITeacherItem {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

const TeacherList: React.FC = () => {
  const [ subject, setSubject ] = useState('');
  const [ weekDay, setWeekDay ] = useState('');
  const [ time, setTime ] = useState('');

  const [ teacherList, setTeacherList ] = useState<ITeacherItem[]>([]); 

  async function handleSearchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get<ITeacherItem[]>(`classes?week_day=${Number(weekDay)}&time=${time}&subject=${subject}`)
  
    setTeacherList(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader 
        titleHeader="Estes são os proffys disponíveis." 
      >
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
          <Select 
            label="Matéria" 
            name="subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Física', label: 'Física' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
              { value: 'História', label: 'História' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Literatura', label: 'Literatura' },
              { value: 'Filosofia', label: 'Filosofia' },
              { value: 'Sociologia', label: 'Sociologia' },
              { value: 'Redação', label: 'Redação' },
            ]}
          />
          <Select 
            label="Dia da semana" 
            name="week-day"
            onChange={e => setWeekDay(e.target.value)}
            value={weekDay}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" }
            ]}
          />
          <Input 
            onChange={e => setTime(e.target.value)} 
            value={time}
            label="Hora" 
            name="time" 
            type="time"
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        { teacherList.map(teacher => (
          <TeacherItem 
            key={teacher.id}
            teacher_id={teacher.id}
            avatar={teacher.avatar}
            bio={teacher.bio}
            cost={teacher.cost}
            name={teacher.name}
            subject={teacher.subject}
            whatsapp={teacher.whatsapp}
          />
        )) }
      </main>
    </div>
  );
}

export default TeacherList;