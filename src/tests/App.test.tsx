import { render, screen, fireEvent} from '@testing-library/react';
import App from '../components/App';
import { act } from 'react-dom/test-utils';

jest.setTimeout(15000);

const sampleRowData = [
  {
      icon: {
          resolutions: [[51,51],[129,129],[101,101],[257,257],[25,25]],
          id: "0da32da2-b540-4b03-92c0-4ee5e25da040"
        },
        line: {
          name: "airMAX",
          id: "airmax"
        },
        product: {
          abbrev: "airCube",
          name:"airCube"
        },
        shortnames: ["ACB"]
  },
  {
      icon: {
          resolutions:[[51,51],[129,129],[257,257],[25,25],[101,101]],
          id:"59091973-2a6a-4e32-833d-b211e7c6811c"
      },
      line: {
          name: "AmpliFi",
          id: "amplifi"
      },
      product: {
          abbrev:"AmpliFi Instant Mesh Point",
          name:"AmpliFi Instant Mesh Point"
      },
      shortnames:["AFi-INS-P"]
  }
]

global.fetch = async function () {
  return {
    json: async function () {
      return {
        devices: sampleRowData
      }
    }
  }
} as jest.Mock;  

test('displays correct total number of devices', async () => {
  act(() => {render(<App/>);});
  await new Promise((r) => setTimeout(r, 500));
  const counter = screen.getByText(/[\d*] devices/i);
  expect(counter.innerHTML).toBe(` ${sampleRowData.length} devices`);
});

test('displays all devices from sample', async () => {
  act(() => {render(<App/>);})
  await new Promise((r) => setTimeout(r, 500));
  for (let i = 0; i < sampleRowData.length; i++) {
    expect(screen.getByText(sampleRowData[i].product.name)).toBeInTheDocument();
  }
})

test('search picks some devices from the sample', async () => {
  act(() => {render(<App/>);})
  await new Promise((r) => setTimeout(r, 500));
  fireEvent.change((await screen.findByTestId('search')), {target: {value: 'airmax'}});
  await new Promise((r) => setTimeout(r, 500));
  expect(screen.queryByText(/airmax/i)).toBeInTheDocument();
  expect(screen.queryByText(/AmpliFi/i)).toBeNull();
})

test('filter by line name', async () => {
  act(() => {render(<App/>);})
  await new Promise((r) => setTimeout(r, 500));
  fireEvent.click(screen.getByRole('Filter--Button'));
  await new Promise((r) => setTimeout(r, 100));
  fireEvent.click(screen.getAllByRole('Filter--Bar--Term')[0]);
  fireEvent.click(screen.getByRole('Filter--Button'));
  await new Promise((r) => setTimeout(r, 500));
  screen.queryAllByText(/airmax/i).forEach(element => {
    expect(element).toBeInTheDocument();
  })
  expect(screen.queryAllByText(/AmpliFi/i).length).toBe(0);
})



