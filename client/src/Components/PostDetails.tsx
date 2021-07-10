// @ts-nocheck
import React, { useContext, useState, useEffect } from "react";
import { EditorContext } from "../Contexts/EditorContext";

import StyledInput from "./Input";
import MetaTags from "./Helmet"
import styled from "styled-components";

const PostDetails = () => {
    const {
        title,
        setTitle,
        description,
        setDescription,
        setCategory,
        postArticle,
        category,
        loading
    } = useContext(EditorContext);

    console.log('LOADING', loading)

    return (<Wrapper onSubmit={(e) => postArticle(e)} >

        <InputWrapper>
            <Input placeholder="Choose a title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}>

            </Input>
        </InputWrapper>
        <InputWrapper>
            <TextArea
                placeholder="Write a small description"
                value={description}
                rows="10"
                cols="33"
                required
                onChange={(e) => setDescription(e.target.value)}
            >
            </TextArea>
        </InputWrapper>
        <SelectWrapper>

            <Label >Select a category:</Label >

            <Select required onChange={(e) => setCategory(e.target.value)}>
                <option></option>
                <option value="coding">coding</option>
                <option value="random">random</option>

            </Select>

        </SelectWrapper>
        <ButtonWrapper>
            <Button type="submit" disabled={loading} value="PUBLISH"></Button>
        </ButtonWrapper>
    </Wrapper>)
};

export default PostDetails;

const Wrapper = styled.form`
display:flex;
flex-direction:column;
max-width: 400px;
justify-content: center;
margin-right: 80px
`;

const TextArea = styled.textarea`
width:105%;


`;

const Label = styled.label`
width: 50%;
`;


const Select = styled.select`
width: 50%;
height: 35px;
`;


const InputWrapper = styled.div`
padding:8px;


`;

const SelectWrapper = styled.div`
width:100%;
padding:8px;
display: flex;
    justify-content: space-between;
    align-items: center;
`;


const Input = styled.input`
padding:8px;
width:100%;
`;

const ButtonWrapper = styled.div`
width:100%;
padding:8px
`;


const Button = styled.input`
width:100%;
height:35px;
&:hover{
    cursor: pointer;
}
`;


