import React from 'react';
import { connect } from 'react-redux';


import { setFilter } from '../../actions/actions';
import "./visibility-filter.scss";

function VisibilityFilterInput(props) {
  return <input
    className='visibility-filter'
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="search movie.."
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);