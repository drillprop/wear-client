import React from 'react';
import { SingleItemQuery } from '../../../generated/types';
import { SiteSubtitle } from '../../../styles/site.styles';
import { EditButton } from '../SingleProductContainer.styles';

interface Props {
  item?: SingleItemQuery['item'];
  setToEditState: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditItemForm: React.FC<Props> = ({ item, setToEditState }) => {
  return (
    <div>
      <SiteSubtitle>{item?.category}</SiteSubtitle>
      <EditButton onClick={() => setToEditState(false)}>
        back to item(cancel)
      </EditButton>
    </div>
  );
};

export default EditItemForm;
