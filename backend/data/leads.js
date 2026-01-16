import { faker } from '@faker-js/faker';

const leads = [];
const statuses = ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'];
const sources = ['Website', 'Referral', 'Advertisement', 'Cold Call', 'Other'];

for (let i = 0; i < 300; i++) {
  leads.push({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    status: faker.helpers.arrayElement(statuses),
    source: faker.helpers.arrayElement(sources),
    notes: faker.lorem.sentence(),
  });
}

export default leads;
