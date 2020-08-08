import React, { useState, FormEvent } from 'react';

import { useHistory } from 'react-router-dom';

import './styles.css';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

interface Schedule {
  week_day: string;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [ name, setName ] = useState('');
  const [ avatar, setAvatar ] = useState('');
  const [ whatsapp, setWhatsapp ] = useState('');
  const [ bio, setBio ] = useState('');
  const [ subject, setSubject ] = useState('');
  const [ cost, setCost ] = useState(0);
  const [ schedule, setSchedule ] = useState<Schedule[]>([
    { week_day: "0", from: '', to: '' },
  ]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const convertedWeekDaySchedule = schedule.map(sch => {
        return { ...sch, week_day: Number(sch.week_day) }
      });

      const data = {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule: convertedWeekDaySchedule
      }

      await api.post('classes', data);

      alert('Cadastro realizado com sucesso')

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro')
    }
  }

  function handleAddSchedule() {
    setSchedule(previewSchedules => [
      ...previewSchedules,
      { week_day: "0", from: '', to: '' },
    ]);
  }

  function setScheduleValue(position: number, field: string, value: string) {
    const updatedScheduleItems = schedule.map((scheduleItem, index) => {
      if ( index === position ) {
        const newScheduleItems = { ...scheduleItem, [field]: value };
        
        return newScheduleItems;
      }
      else return scheduleItem;
    });

    setSchedule(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        titleHeader="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              Seus dados
            </legend>

            <Input onChange={ e => setName(e.target.value)} value={name} label="Nome completo" name="name" />
            <Input onChange={ e => setAvatar(e.target.value)} value={avatar} label="Avatar" name="avatar" />
            <Input onChange={ e => setWhatsapp(e.target.value)} value={whatsapp} label="WhatsApp" name="whatsapp" />
          
            <Textarea onChange={ e => setBio(e.target.value)} value={bio} name="bio" label="Biografia"/>
          </fieldset>

          <fieldset>
            <legend>
              Sobre a aula
            </legend>

            <Select 
              label="Matéria" 
              name="subject"
              value={ subject }
              onChange={ e => setSubject(e.target.value)}
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
            <Input onChange={ e => setCost(Number(e.target.value))} value={cost} label="Custo da sua hora por aula" name="cost" />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis

              <button type="button" onClick={handleAddSchedule}>
                + Novo Horário
              </button>
            </legend>
            
            {schedule.map((sch, index) => {
              return (
                <div className="schedule-item" key={index}>
                  <Select 
                    label="Dia da semana" 
                    name="week-day"
                    value={sch.week_day}
                    onChange={ e => setScheduleValue(index, 'week_day', e.target.value)}
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
                    onChange={ e => setScheduleValue(index, 'from', e.target.value)} 
                    name="from" 
                    label="Das" 
                    type="time"
                    value={sch.from}
                  />
                  <Input 
                    onChange={ e => setScheduleValue(index, 'to', e.target.value)} 
                    name="to"
                    label="Até" 
                    type="time"
                    value={sch.to}
                  />
                </div>
              )
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="important-advise"/>
              Importante! <br/>
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;