import { useParams } from 'react-router-dom';
import OpportunityForm from '../components/OpportunityForm';

const EditOpportunity = () => {
    const { id } = useParams();
    return <OpportunityForm mode="edit" opportunityId={id} />;
};

export default EditOpportunity;