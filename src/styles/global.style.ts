import styled from 'styled-components';
import tw from 'twin.macro';
export const Section = styled.section`
  padding: 25px 0;
  ${tw`px-3`}

  @media (min-width: 768px) {
    padding: 50px 0;
  }
`;

export const TitleSection = styled.h2`
  color: #272727;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    font-size: 30px;
    margin-bottom: 52px;
  }
`;

export const Card = styled.div`
  ${tw`h-full border border-opacity-60 overflow-hidden relative`}
  border-radius: 20px;
  height: ${(props) => props.height}px;
`;

export const ContainerModal = styled.div`
  ${tw`w-full bg-white rounded-md`}
`;

export const HeaderModal = styled.div`
  ${tw`font-normal text-sm border-b p-5`}
`;

export const BodyModal = styled.div`
  ${tw`font-normal text-sm p-10`}
`;
