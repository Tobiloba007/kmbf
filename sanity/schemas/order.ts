// order.ts
import { defineType, defineField } from "sanity";

export const order = defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Reference",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Delivery Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Sent for Delivery", value: "sent_for_delivery" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    }),
    defineField({
      name: "customer",
      title: "Customer Details",
      type: "object",
      fields: [
        { name: "name", title: "Full Name", type: "string" },
        { name: "email", title: "Email Address", type: "string" },
        { name: "phone", title: "Phone Number", type: "string" },
      ],
    }),
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        { name: "address", title: "Address", type: "string" },
        { name: "apartment", title: "Apartment", type: "string" },
        { name: "city", title: "City", type: "string" },
        { name: "state", title: "State", type: "string" },
        { name: "country", title: "Country", type: "string" },
      ],
    }),
    defineField({
      name: "items",
      title: "Ordered Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Product Name", type: "string" },
            { name: "size", title: "Size", type: "string" },
            { name: "quantity", title: "Quantity", type: "number" },
            { name: "price", title: "Unit Price (NGN)", type: "number" },
            { name: "image", title: "Image URL", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "totals",
      title: "Order Totals",
      type: "object",
      fields: [
        { name: "subtotal", title: "Subtotal", type: "number" },
        { name: "shippingFee", title: "Shipping Fee", type: "number" },
        { name: "grandTotal", title: "Grand Total", type: "number" },
      ],
    }),
    defineField({
      name: "createdAt",
      title: "Order Date",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "orderNumber",
      subtitle: "customer.name",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      const statusLabels: Record<string, string> = {
        pending: "PENDING",
        sent_for_delivery: "SENT FOR DELIVERY",
        delivered: "DELIVERED",
        cancelled: "CANCELLED",
      };
      return {
        title: `Ref: ${title || "N/A"}`,
        subtitle: `${subtitle || "Customer"} • [${statusLabels[status] || "PENDING"}]`,
      };
    },
  },
});